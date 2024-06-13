import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray ,AbstractControl, ValidatorFn} from '@angular/forms';
import { Event } from '../../../../shared/classes/event';
import { UploadedFile } from '../../../../shared/classes/uploaded-file';
import { Image } from '../../../../shared/classes/image';
import { Categorie } from '../../../../shared/classes/categorie';
import { EventService } from '../../../../shared/service/event.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxDropzoneModule, NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { CategorieService } from '../../../../shared/service/categorie.service';

import { FileSaverService } from 'ngx-filesaver';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})


export class EventAddComponent {

  public Editor = ClassicEditor;
  eventForm: FormGroup;
  event= {
    title: '',
    slug: '',
    full_description: '',
    short_description: '',
    ticket_price: 0,
    stock: 1,
    start_date: new Date(),
    end_date: new Date(),
    location: '',
    video: '',
    images: [],
    categories: [],
    tags: "",
    reviews: "",
    pageViews: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: 0,
    team1_name: '',
    team2_name: ''
  };
  files: File[] = [];
  url: any[] = [];
  categories: Categorie[] = [];
  imageFormArray: FormArray;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private fileSaverService: FileSaverService,private categorieService: CategorieService) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      full_description: ['', Validators.required],
      short_description: ['', Validators.required],
      ticket_price: [10, Validators.required],
      stock: [1, Validators.required],
      start_date: new Date(),
      end_date: new Date(),
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
   

    // Fetch categories by type 'event' from the service
    this.categorieService.getCategoriesByType('event').subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    this.eventForm.get('title').valueChanges.subscribe(value => {
      this.eventForm.get('slug').setValue(this.generateSlug(value));
    });
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

  validateEndDate(): void {
    const startDate = this.eventForm.get('start_date').value;
    const endDate = this.eventForm.get('end_date').value;

    if (startDate && endDate && startDate > endDate) {
      this.eventForm.get('end_date').setErrors({ endDateInvalid: true });
    } else {
      this.eventForm.get('end_date').setErrors(null);
    }
  }

  addImage(url: string) {
    const imageFormGroup = this.formBuilder.group({
      url: [url, Validators.required]
    });
    this.imageFormArray.push(imageFormGroup);
  }

  removeImage(index: number): void {
    this.imageFormArray.removeAt(index);
    this.url.splice(index, 1);
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

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
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
  }

  submitForm(): void {
    console.log(this.eventForm.value);
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
    
    
    this.event = { ...this.eventForm.value };
    console.log("this.event",this.event);
    const formData = new FormData();
   
    formData.append('title', this.event.title);
    formData.append('slug', this.event.slug);
    formData.append('full_description', this.event.full_description);
    formData.append('short_description', this.event.short_description);
    formData.append('ticket_price', this.event.ticket_price.toString());
    formData.append('stock', this.event.stock.toString());
    formData.append('start_date', this.event.start_date.toString());
    formData.append('end_date', this.event.end_date.toString());
    formData.append('location', this.event.location);
    formData.append('video', this.event.video);
    formData.append('tags', this.event.tags);
    formData.append('categories', this.event.categories.join(','));
    formData.append('team1_name', this.event.team1_name);
    formData.append('team2_name', this.event.team2_name);
  

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }

    this.eventService.saveEvent(formData).subscribe(
      (response) => {
        console.log('Event saved:', response);
        this.eventForm.reset();
        this.files = [];
        this.errorMessages = []; 
      },
      (error) => {
        if (error.status === 400 && error.error.errors) {
          this.errorMessages = error.error.errors.map((e) => e.msg);
        } else {
          this.errorMessages = ['An unexpected error occurred. Please try again.'];
        }
      }
    );
  }
 
}
