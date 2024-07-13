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
  selector: "app-job-offer-appointments",
  templateUrl: "./job-offer-appointments.component.html",
  styleUrls: ["./job-offer-appointments.component.scss"],
})
export class JobOfferAppointmentsComponent implements OnInit {
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
      this.list = response.appointments;
      this.applyFilters();
      this.total = this.list.length;
    });
  }
  public list = [] as any;
  public total = 0;
  public page = 1;
  public pageSize = 10;
  public sortColumn = "";
  public sortDirection = "";
  public searchControl = new FormControl("");
  appointments = [] as any;

  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.appointments = this.list
      .filter((appointment: any) => {
        return (
          !this.searchControl ||
          appointment?.jobApplication?.jobOffer?.jobTitle
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.description
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.tasksDescription
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.reference
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.country
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.city
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.location
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.jobOffer?.jobContract
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.studentName
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.studentAddress
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.jobApplication?.email
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.title
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.description
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.studentComment
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.employerComment
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.meetLink
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          appointment?.appointmentAddress
            ?.toUpperCase()
            .includes(this.searchControl.value.toUpperCase())
        );
      })
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

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

  appointmentDetails(item: any) {
    this.router.navigate([
      "/job-offers/appointment-details/" + item.appointmentId,
    ]);
  }

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

  onPageChange(page: number) {
    this.page = page - 1; // Convert to zero-based index
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
