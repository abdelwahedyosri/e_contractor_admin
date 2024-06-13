import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { Event } from '../classes/event';
import { Tag } from '../classes/tag';
import { Categorie } from '../classes/categorie';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public Events:Event[]
  private baseUrl = 'http://localhost:5000/events'; 

  constructor(private http: HttpClient ) { }



  public getEvents(): Observable<Event[]> {
    return this.http.get<any>(`${this.baseUrl}/getEvents`).pipe(
      map(response => {
        console.log(response.events);
        const categories: Categorie[] = [];
        const tags: Tag[] = [];
  
        response.events.forEach(event => {
          event.categories.forEach(category => {
            if (!categories.find(cat => cat.name === category.name)) {
              categories.push(category);
            }
          });
  
          event.tags.forEach(tag => {
            if (!tags.find(t => t.name === tag.name)) {
              tags.push(tag);
            }
          });
        });
  
        const events: Event[] = response.events.map(event => ({
          id: event._id,
          img: event.images.length > 0 ? event.images[0].url : '',
          title: event.title,
          entry_type: event.categories.length > 0 ? event.categories[0].name : '',
          stock: event.stock,
          ticket_price: event.ticket_price,
          start_date: event.start_date,
          end_date: event.end_date,
          slug: event.slug,
          full_description: event.full_description,
          short_description: event.short_description,
          team1_name: event.team1_name,
          team2_name: event.team2_name
        }));
  
        console.log('Categories:', categories);
        console.log('Tags:', tags);
  
        return events;
      })
    );
  }

  public deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEvent/${eventId}`);
  }

  public saveEvent(eventForm: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveEvent`, eventForm);
  }
  public getEvent(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOneEvent/${id}`);
  }

  public updateEvent(eventId: string, eventForm: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateEvent/${eventId}`, eventForm);
  }
}
