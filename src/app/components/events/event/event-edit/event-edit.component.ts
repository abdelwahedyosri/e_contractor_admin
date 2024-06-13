import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Event } from '../../../../shared/classes/event';
import { Image } from '../../../../shared/classes/image';
import { Categorie } from '../../../../shared/classes/categorie';
import { EventService } from '../../../../shared/service/event.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxDropzoneModule, NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { CategorieService } from '../../../../shared/service/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  public Editor = ClassicEditor;
  eventForm: FormGroup;
  event= {
    title: '',
    slug: '',
    full_description: '',
    short_description: '',
    ticket_price: 0,
    stock: 1,
    start_date: "",
    end_date: "",
    location: '',
    video: '',
    images: [],
    categories: [],
    tags: [],
    reviews: '',
    pageViews: 0,
    createdAt: "",
    updatedAt: "",
    quantity: 0,
    team1_name: '',
    team2_name: ''
  };
  UpdatedEvent= {
    title: '',
    slug: '',
    full_description: '',
    short_description: '',
    ticket_price: 0,
    stock: 1,
    start_date: "",
    end_date: "",
    location: '',
    video: '',
    images: [],
    categories: [],
    tags: [],
    reviews: '',
    pageViews: 0,
    createdAt: "",
    updatedAt: "",
    quantity: 0,
    team1_name: '',
    team2_name: ''
  };
  files: File[] = [];
  url: any[] = [];
  url_collection : any[] = []; 
  categories: Categorie[] = [];
  imageFormArray: FormArray;
  eventId: string;
  errorMessages: string[] = [];
  selectedCategories: string[] = [];
  tags:"";
  shortDescriptionValue:any;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private fileSaverService: FileSaverService,
    private categorieService: CategorieService,
    private route: ActivatedRoute
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      full_description: ['', Validators.required],
      short_description: ['', Validators.required],
      ticket_price: [10, Validators.required],
      stock: [1, Validators.required],
      start_date: "",
      end_date: "",
      location: ['', Validators.required],
      video: ['', [Validators.required, this.videoUrlValidator]],
      categories: [[''], Validators.required],
      tags: ["", Validators.required],
      team1_name: ["", Validators.required],
      team2_name: ["", [Validators.required]],
      images: this.formBuilder.array([]),
    });

    this.imageFormArray = this.eventForm.get('images') as FormArray;
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    // Fetch event details to be edited based on event ID
    this.eventService.getEvent(this.eventId).subscribe(
      (response) => {
        console.log("response.event",response.event);
        this.event = response.event[0];
        
        this.url_collection .push(this.event.images.map(image => image.url));
        this.url=this.url_collection[0];
        console.log("this.url",this.url);
        
        this.selectedCategories = this.event.categories.map(category => category.name);
        
        this.shortDescriptionValue=this.event.short_description;
        console.log(this.shortDescriptionValue);
        // Create a new FormControl and set its value to the Date object

        console.log("this.event",new Date(this.event.start_date));
        this.populateFormWithData();
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );

    // Fetch categories by type 'event' from the service
    this.categorieService.getCategoriesByType('event').subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    this.eventForm.get('title').valueChanges.subscribe(value => {
      this.eventForm.get('slug').setValue(this.generateSlug(value));
    });
  }
  convertToDate(dateString: string): Date {
    return new Date(dateString);
  }

  populateFormWithData(): void {
    
    console.log("this.event",this.event);
    if (this.event) {
      const startDateISO = new Date(this.event.start_date).toISOString().substring(0, 10);
      const endDateISO = new Date(this.event.end_date).toISOString().substring(0, 10);
      this.eventForm.patchValue({
        title: this.event.title,
        slug: this.event.slug,
        full_description: this.event.full_description,
        short_description: this.event.short_description,
        ticket_price: this.event.ticket_price,
        stock: this.event.stock,
        start_date: startDateISO,
        end_date: endDateISO,
        location: this.event.location,
        video: this.event.video,
        categories: this.selectedCategories,
        tags: this.event.tags.map(tag => tag.name).join(', '),
        team1_name: this.event.team1_name,
        team2_name: this.event.team2_name,
      });

    }
  }
  validateEndDate(): void {
    const startDate = this.eventForm.get('start_date').value;
    const endDate = this.eventForm.get('end_date').value;

    if (startDate && endDate && startDate > endDate) {
      this.eventForm.get('end_date').setErrors({ endDateInvalid: true });
    } else {
      this.eventForm.get('end_date').setErrors(null);
    }
  }
  onSubmit(): void {
    if (this.eventForm.valid) {
      // Retrieve the updated values from the form
    this.validateEndDate();
    this.event = { ...this.eventForm.value };
   
    console.log(this.event);
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      Object.keys(this.eventForm.controls).forEach((controlName) => {
        const control = this.eventForm.get(controlName);
        if (control.invalid) {
          const errors = control.errors;
          console.log(`Validation errors for ${controlName}:`, errors);
        }
      });
      console.log("invalid");
      return;
    }
    const images=this.url.filter((item) => typeof item === 'string' && item.match(/^(http|https):\/\/.+$/)) as string[];
    console.log(images);

    
    this.UpdatedEvent = { ...this.eventForm.value };
    console.log("this.updatedEvent",this.UpdatedEvent.categories.join(','));
    //const urlStringArray: string[] = this.url.filter((item): item is string => typeof item === 'string');
    const formData = new FormData();
    formData.append('title', this.UpdatedEvent.title);
    formData.append('slug', this.UpdatedEvent.slug);
    formData.append('full_description', this.UpdatedEvent.full_description);
    formData.append('short_description', this.UpdatedEvent.short_description);
    formData.append('ticket_price', this.UpdatedEvent.ticket_price.toString());
    formData.append('stock', this.UpdatedEvent.stock.toString());
    formData.append('start_date', this.UpdatedEvent.start_date.toString());
    formData.append('end_date', this.UpdatedEvent.end_date.toString());
    formData.append('location', this.UpdatedEvent.location);
    formData.append('video', this.UpdatedEvent.video);
    formData.append('tags',this.UpdatedEvent.tags.toString() );
    formData.append('categories', this.UpdatedEvent.categories.join(','));
    formData.append('team1_name', this.UpdatedEvent.team1_name);
    formData.append('team2_name', this.UpdatedEvent.team2_name);
    formData.append('images', images.join(','));
    console.log("this.files",this.files);
    for (let i = 0; i < this.files.length; i++) {
      formData.append('uploadedfiles', this.files[i]);
    }

      // Update the event using the EventService
      this.eventService.updateEvent(this.eventId, formData).subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          // Redirect to the event details page or any other desired page
          // this.router.navigate(['/event', this.eventId]);
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please fill in all the required fields.');
    }
  }

  onImageUpload(event: NgxDropzoneChangeEvent): void {
    this.files = event.addedFiles;

    // Perform image upload logic here
    console.log('Images uploaded:', this.files);

    // Add uploaded images to the form
    this.files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url.push(e.target.result);
        this.imageFormArray.push(
          this.formBuilder.group({
            id: [null],
            url: [e.target.result],
          })
        );
      };
      reader.readAsDataURL(file);
    });
  
  
  }

  removeImage(index: number): void {
    this.imageFormArray.removeAt(index);
    this.url.splice(index, 1);
    console.log(this.url);
  }
  onEditorReady(editor: any) {
    editor.model.document.on('change', () => {
      const data = editor.getData();
      this.eventForm.patchValue({ full_description: data });
    });
  }

  onShortDescriptionEditorReady(editor: any) {

    editor.model.document.on('change', () => {
      const data = editor.getData();
      this.eventForm.patchValue({ short_description: data });
    });
    editor.setData(this.eventForm.get('short_description').value);
  }

  generateSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }
  videoUrlValidator(control) {
    if (control.value && !/^((http|https):\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(control.value)) {
      return { 'invalidUrl': true };
    }
    return null;
  }
 

  getVideoErrors(control) {
    const errors = [];
    if (control.errors.required) {
      errors.push('Video URL is required.');
    }
    if (control.errors.invalidUrl) {
      errors.push('Invalid video URL.');
    }
    return errors;
  }
}
