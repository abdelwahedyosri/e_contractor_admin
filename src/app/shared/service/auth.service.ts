import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}`;  

  constructor(private http: HttpClient) { }

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

  logout(): void {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.authUrl}/users/exist/${username}`);
}

forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.authUrl}/forgot-password`, { email });
}

resetPassword(token: string, email: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.authUrl}/reset-password`, { token, email, newPassword });
}
}
