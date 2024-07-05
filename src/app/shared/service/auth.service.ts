import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}`;  

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.jwt) {
          if (rememberMe) {
            localStorage.setItem('jwt_token', response.jwt);
          } else {
            sessionStorage.setItem('jwt_token', response.jwt);
          }
        }
      })
    );
  }

  private updateLastLogin(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.authUrl}/update-last-login`, {}, { headers });
  }

  logout(): void {
    this.updateLastLogin().subscribe(() => {
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');
      this.router.navigate(['/login']);
    });
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  

 

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.sub; // Assuming 'sub' contains the username
    }
    return null;
  }
}
