import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { EventsRoutingModule } from './events-routing.module';

import { EventListComponent } from './event/event-list/event-list.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';

import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
// import {  } from '../../directives/shorting.directive/';
import { StripHtmlTagsPipe } from '../../strip-html-tags.pipe';



@NgModule({
  declarations: [ EventListComponent, EventAddComponent, EventEditComponent,EventDetailComponent,StripHtmlTagsPipe],
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    NgbModule,
    GalleryModule,
    CKEditorModule,
    NgxDropzoneModule,
  
    SharedModule
  ],
  exports: [],
  bootstrap: [],
  providers: [
    NgbActiveModal
  ]
})
export class EventsModule { }
