import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/shared/classes/permission';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = `${environment.apiUrl}/permissions`;  // Base URL for permission-related endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getPermissionById(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.baseUrl, permission, { headers: this.getHeaders() });
  }

  updatePermission(id: number, permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${this.baseUrl}/${id}`, permission, { headers: this.getHeaders() });
  }

  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
