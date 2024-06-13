import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/shared/directives/shorting.directive';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';
import { Event } from 'src/app/shared/classes/event';
import { EventService } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  tableItem$: Observable<Event[]>;

  constructor(public eventService: EventService) {}

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.tableItem$ = this.eventService.getEvents();
  }

  onSort({ column, direction }: SortEvent) {
    console.log('Sorting:', column, direction);

    // Resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // TODO: Implement sorting logic here
  }

  deleteEvent(eventId: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        // Update the table after successful deletion
        this.tableItem$ = this.eventService.getEvents();
      });
    }
  }
}
