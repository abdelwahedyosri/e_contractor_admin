import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../../../shared/classes/event';
import { EventService } from '../../../../shared/service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class EventDetailComponent implements OnInit {
  public closeResult: string;
  public counter: number = 1;
  currentRate = 8;
  eventId: string;
  event:Event;

  public imagesRect: Image[] = []

  constructor(private modalService: NgbModal, config: NgbRatingConfig  ,private eventService: EventService,
   private route: ActivatedRoute) {
    this.eventId = this.route.snapshot.paramMap.get('id');
    config.max = 5;
    config.readonly = false;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  ngOnInit() {
    this.eventService.getEvent(this.eventId).subscribe(
      (response) => {
        this.event = response.event[0];
        this.event = response.event[0];
        this.imagesRect = this.event.images.map((image, index) => new Image(
          index,
          { img: image.url, description: '', title: '', alt: `Image ${index + 1}` },
          { img: image.url, description: '', title: '', alt: `Image ${index + 1}` }
        ));
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }

}
