import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Role } from '../classes/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = `${environment.apiUrl}/roles`;  // Base URL for role-related endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Fetch role by ID
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Create a new role
  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role, { headers: this.getHeaders() });
  }

  // Update an existing role
  updateRole(id: number, role: Partial<Role>): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${id}`, role, { headers: this.getHeaders() });
  }

  // Delete a role
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
