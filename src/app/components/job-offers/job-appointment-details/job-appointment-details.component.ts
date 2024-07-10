import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";
import {
  appointment_locations,
  appointment_types,
  appointments_statuses,
  countries,
  currencies,
  education_levels,
  employment_experiences,
  hours,
  job_categories,
  job_contracts,
  job_offer_form_steps,
  job_types,
  job_workplaces,
  languages,
  renumeration_periods,
} from "src/assets/job-offer/helpers/constants";
import {
  formatDateAgo,
  formatText,
} from "src/assets/job-offer/helpers/helpers";

@Component({
  selector: "app-job-appointment-details",
  templateUrl: "./job-appointment-details.component.html",
  styleUrls: ["./job-appointment-details.component.scss"],
})
export class JobAppointmentDetailsComponent implements OnInit {
  constructor(
    private jobOfferService: JobOfferService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const appointmentId = this.activatedRoute.snapshot.params["appointmentId"];
    console.log(appointmentId);
    if (appointmentId) {
      this.fetchJobOffer(appointmentId);
    }
  }

  fetchJobOffer(appointmentId: number) {
    this.jobOfferService
      .getAppointment(appointmentId)
      .subscribe((response: any) => {
        this.appointment = response.appointment;
        console.log(response);
      });
  }
  appointment = {} as any;

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getLabel(array: any[], value: string): string {
    const item = array.find((element: any) => element.value === value);
    return item ? item.label : "";
  }

  getFormattedDate(date: any) {
    return formatDateAgo(date);
  }

  loader = false;
  comment = "";
  status = "";

  isVideoFileType = (ext: string): boolean => {
    const videoExtensions: string[] = [
      "mp4",
      "avi",
      "mkv",
      "mov",
      "hevc",
      "h264",
    ];
    return videoExtensions.includes(ext);
  };

  formatdate(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  getTime(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const theTime = this.appointmentHours.find(
      (time) => time.value == formattedTime
    );

    return theTime?.label;
  }

  appointmentHours = hours;
  appointmentTypes = appointment_types;
  appointmentLocations = appointment_locations;
  appointmentStatus = appointments_statuses.filter(
    (status: any) => status.value != this.appointment.appointmentStatus
  );

  getFormatText(text: any) {
    return formatText(text);
  }
}
