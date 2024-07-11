import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment"; // Adjust the path as necessary
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class JobOfferService {
  private baseUrl = `${environment.apiUrl}/`; // Base URL for user-related endpoints

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  listPublished() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/published", {
      headers: this.getHeaders(),
    });
  }

  listDrafts() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/drafts", {
      headers: this.getHeaders(),
    });
  }

  listSkills() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/skills", {
      headers: this.getHeaders(),
    });
  }

  deleteSkill(skillId: number) {
    return this.http.post<any>(
      this.baseUrl + "private/job-offer/skill/" + skillId + "/delete",
      {},
      { headers: this.getHeaders() }
    );
  }

  restoreSkill(skillId: number) {
    return this.http.post<any>(
      this.baseUrl + "private/job-offer/skill/" + skillId + "/restore",
      {},
      { headers: this.getHeaders() }
    );
  }

  getJobOffer(reference: string) {
    return this.http.get<any>(
      this.baseUrl + "private/job-offer/reference/" + reference,
      { headers: this.getHeaders() }
    );
  }

  listApplications() {
    return this.http.get<any[]>(this.baseUrl + "private/job-application/list", {
      headers: this.getHeaders(),
    });
  }

  listAppointments() {
    return this.http.get<any[]>(
      this.baseUrl + "private/job-application/appointments",
      { headers: this.getHeaders() }
    );
  }
  listFiles() {
    return this.http.get<any[]>(
      this.baseUrl + "private/job-application/files",
      { headers: this.getHeaders() }
    );
  }

  downloadFile(fileName: string) {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/octet-stream",
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      this.baseUrl + "private/job-application/download-file/" + fileName,
      {
        headers: headers,
        responseType: "blob" as "json",
      }
    );
  }

  getFile(fileName: string): string {
    return this.baseUrl + "private/job-application/display-file/" + fileName;
  }

  getJobApplication(reference: string) {
    return this.http.get<any>(
      this.baseUrl + "private/job-application/reference/" + reference,
      { headers: this.getHeaders() }
    );
  }

  getAppointment(appointmentId: number) {
    return this.http.get<any>(
      this.baseUrl + "private/job-application/appointment/" + appointmentId,
      { headers: this.getHeaders() }
    );
  }
}
