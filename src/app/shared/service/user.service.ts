import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user'; // Ensure you have a User model defined
import { environment } from '../../../environments/environment'; // Adjust the path as necessary
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;  // Base URL for user-related endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Register a new user
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user, { headers: this.getHeaders() });
  }

  // Reset password
  resetPassword(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.post<void>(`${this.baseUrl}/reset-password`, null, { params, headers: this.getHeaders() });
  }

  // Handle session expired
  handleSessionExpired(userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<void>(`${this.baseUrl}/session-expired`, null, { params, headers: this.getHeaders() });
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Method to get username
  getUsername( token :string ): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/username`, { 
      params: { token },
      headers: this.getHeaders() });
  }

  // Method to get user by username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`, {
      params: { username },
      headers: this.getHeaders()
    });
  }

  // Method to update user field
  updateUserField(fieldName: string, fieldValue: string, username : string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update`, {}, {
      params: { fieldName, fieldValue , username},
      headers: this.getHeaders()
    });
  }
  // Get user by ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  // Assign role to user
  assignRoleToUser(userId: string, roleId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId).set('roleId', roleId);
    return this.http.post<void>(`${this.baseUrl}/assign-role`, null, { params, headers: this.getHeaders() });
  }

  // Remove role from user
  removeRoleFromUser(userId: string, roleId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId).set('roleId', roleId);
    return this.http.post<void>(`${this.baseUrl}/remove-role`, null, { params, headers: this.getHeaders() });
  }

  // Enable 2FA
  enableTwoWayVerification(userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<void>(`${this.baseUrl}/enable-2fa`, null, { params, headers: this.getHeaders() });
  }

  // Disable 2FA
  disableTwoWayVerification(userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<void>(`${this.baseUrl}/disable-2fa`, null, { params, headers: this.getHeaders() });
  }

  // Link social account
  linkSocialAccount(userId: string, provider: string, providerUserId: string): Observable<User> {
    const params = new HttpParams().set('provider', provider).set('providerUserId', providerUserId);
    return this.http.post<User>(`${this.baseUrl}/${userId}/link-social`, null, { params, headers: this.getHeaders() });
  }

  // Get user by social account
  getUserBySocialAccount(provider: string, providerUserId: string): Observable<User> {
    const params = new HttpParams().set('provider', provider).set('providerUserId', providerUserId);
    return this.http.get<User>(`${this.baseUrl}/social-account`, { params, headers: this.getHeaders() });
  }

  
}
