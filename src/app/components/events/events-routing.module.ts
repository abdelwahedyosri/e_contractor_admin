import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EventCategoryComponent } from './event/event-category/event-category.component';

import { EventListComponent } from './event/event-list/event-list.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'digital/digital-category',
        component: EventCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'events-listing',
        component: EventListComponent,
        data: {
          title: "Event List",
          breadcrumb: "Event List"
        }
      },
      {
        path: 'add-new-event',
        component: EventAddComponent,
        data: {
          title: "Add Event",
          breadcrumb: "Add Event"
        }
      },
      {
        path: 'edit-event/:id',
        component: EventEditComponent,
        data: {
          title: "Edit Event",
          breadcrumb: "Edit Event"
        }
      },
      {
        path: 'event-detail/:id',
        component: EventDetailComponent,
        data: {
          title: "Edit Event",
          breadcrumb: "Edit Event"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
