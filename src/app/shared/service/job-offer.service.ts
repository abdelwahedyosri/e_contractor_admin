import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment"; // Adjust the path as necessary

@Injectable({
  providedIn: "root",
})
export class JobOfferService {
  private baseUrl = `${environment.apiUrl}/`; // Base URL for user-related endpoints

  constructor(private http: HttpClient) {}

  listPublished() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/published");
  }

  listDrafts() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/drafts");
  }

  listSkills() {
    return this.http.get<any[]>(this.baseUrl + "private/job-offer/skills");
  }

  deleteSkill(skillId: number) {
    return this.http.post<any>(
      this.baseUrl + "private/job-offer/skill/" + skillId + "/delete",
      {}
    );
  }

  restoreSkill(skillId: number) {
    return this.http.post<any>(
      this.baseUrl + "private/job-offer/skill/" + skillId + "/restore",
      {}
    );
  }

  getJobOffer(reference: string) {
    return this.http.get<any>(
      this.baseUrl + "private/job-offer/reference/" + reference
    );
  }

  listApplications() {
    return this.http.get<any[]>(this.baseUrl + "private/job-application/list");
  }

  listAppointments() {
    return this.http.get<any[]>(
      this.baseUrl + "private/job-application/appointments"
    );
  }
  listFiles() {
    return this.http.get<any[]>(this.baseUrl + "private/job-application/files");
  }

  downloadFile(fileName: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/octet-stream",
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
      this.baseUrl + "private/job-application/reference/" + reference
    );
  }

  getAppointment(appointmentId: number) {
    return this.http.get<any>(
      this.baseUrl + "private/job-application/appointment/" + appointmentId
    );
  }
}
