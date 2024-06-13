import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:5000/categories'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getCategoriesByType(type: string): Observable<Categorie[]> {
    const url = `${this.baseUrl}/getCategoriesByType?type=${type}`;
    return this.http.get<Categorie[]>(url);
  }

  
}