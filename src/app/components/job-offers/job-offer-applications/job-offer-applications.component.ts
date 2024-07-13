import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";
import {
  appointment_types,
  appointments_statuses,
  countries,
  currencies,
  education_levels,
  employment_experiences,
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
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-job-offer-applications",
  templateUrl: "./job-offer-applications.component.html",
  styleUrls: ["./job-offer-applications.component.scss"],
})
export class JobOfferApplicationsComponent implements OnInit {
  constructor(
    private jobOfferService: JobOfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listApplications();
  }

  listApplications() {
    this.jobOfferService.listApplications().subscribe((response: any) => {
      this.list = response.applications;
      this.appointments = response.appointments;
      this.applyFilters();
      this.total = this.list.length;
    });
  }
  public list = [] as any;
  applications = [] as any;
  public total = 0;
  public page = 1;
  public pageSize = 10;
  public sortColumn = "";
  public sortDirection = "";
  public searchControl = new FormControl("");
  appointments = [] as any;

  jobOfferSteps = job_offer_form_steps;
  activeStep: string = "details";
  jobTypes = job_types;
  jobWorkplaces = job_workplaces;
  jobContracts = job_contracts;
  jobCountries = countries;
  jobRenumerationPeriods = renumeration_periods;
  jobRenumerationCurrencies = currencies;
  jobCategories = job_categories;
  educationLevels = education_levels;
  employmentExperiences = employment_experiences;
  appointmentTypes = appointment_types;
  appointmentStatuses = appointments_statuses;
  languages = languages;
  applicationReference = "";

  calculateMinimumDeadline(): string {
    const today = new Date();
    const minimumDeadline = new Date();
    minimumDeadline.setDate(today.getDate() + 5);
    return this.formatDate(minimumDeadline);
  }

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

  getFormatText(text: any) {
    return formatText(text);
  }

  applicationDetails(item: any) {
    this.router.navigate(["/job-offers/application-details/" + item.reference]);
  }

  getAppointmentsCount(applicationId: any): number {
    return (
      this.appointments.filter(
        (appointment: any) =>
          appointment.jobApplication.applicationId == applicationId
      ).length || 0
    );
  }

  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    console.log(this.list);
    this.applications = this.list
      .filter((application: any) => {
        return (
          !this.searchControl ||
          application?.jobOffer.jobTitle
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.description
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.tasksDescription
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.reference
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.country
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.city
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.location
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.jobOffer.jobContract
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.studentName
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.phoneNumber
            ?.toString()
            .includes(this.searchControl.value.toUpperCase()) ||
          application?.studentTitle
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase())
        );
      })
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onPageChange(page: number) {
    this.page = page;
    this.applyFilters();
  }

  onSort() {
    // Resetting other headers
    // this.headers.forEach((header) => {
    //   if (header.sortable !== column) {
    //     header.direction = "";
    //   }
    // });
    // this.sortColumn = column;
    // this.sortDirection = direction;
    // this.loadJobOffers();
  }

  getElapsedTime(lastLogin: string): string {
    // try {
    //   // Replace space with 'T' to make it ISO compliant
    //   const formattedDate = lastLogin.replace(" ", "T");
    //   const date = new Date(formattedDate);
    //   return formatDistanceToNow(date, { addSuffix: true });
    // } catch (error) {
    //   console.error("Error parsing date:", error);
    //   return "Invalid date";
    // }
    return "";
  }
}
