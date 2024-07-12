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

@Component({
  selector: "app-job-offer-details",
  templateUrl: "./job-offer-details.component.html",
  styleUrls: ["./job-offer-details.component.scss"],
})
export class JobOfferDetailsComponent implements OnInit {
  constructor(
    private jobOfferService: JobOfferService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    const reference = this.activatedRoute.snapshot.params["reference"];
    console.log(reference);
    if (reference) {
      this.fetchJobOffer(reference);
      this.jobOfferService.getJobOfferKpis(reference).subscribe((response: any) => {
        this.data = response;
      });
    }
  }
  data = {} as any;


  fetchJobOffer(reference: string) {
    this.jobOfferService.getJobOffer(reference).subscribe((response: any) => {
      this.job_offer = response.jobOffer;
      this.applications = response.applications;
      this.appointments = response.appointments;
      const skills =
        this.job_offer.skills != null ? this.job_offer.skills.split(",") : [];
      this.job_offer.skills = skills;
      this.job_offer.deadline =
        this.job_offer.deadline == null
          ? this.calculateMinimumDeadline()
          : this.job_offer.deadline;
    });
  }

  job_offer = {} as any;
  applications = [] as any;
  public total_applications = 0;
  public page_applications = 0;
  public pageSize_applications = 10;
  public sortColumn_applications = "";
  public sortDirection_applications = "";
  public searchControl_applications = "";
  appointments = [] as any;
  public total_appointments = 0;
  public page_appointments = 0;
  public pageSize_appointments = 10;
  public sortColumn_appointments = "";
  public sortDirection_appointments = "";
  public searchControl_appointments = "";

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
  appointmentTypes = appointment_types
  appointmentStatuses = appointments_statuses
  requirementExperiences = employment_experiences.filter(
    (req: any) => req.value != "NoExperience"
  );
  saved_skills = [] as any;
  filtered_skills = [] as any;
  languages = languages;
  new_skill = "";
  new_requirement = {
    label: "",
    value: "LessThanOneYear",
  };

  jobApplications = [] as any;
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

  onSort_applications() {
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

  onPageChange_applications(page: number) {
    this.page_applications = page - 1; // Convert to zero-based index
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

  applicationDetails(item: any) {
    this.router.navigate(["/job-offers/application-details/" + item.reference]);
  }

  getAppointmentsCount(applicationId: any): number {
    return (
      this.appointments.filter(
        (appointment: any) => appointment.jobApplication.applicationId == applicationId
      ).length || 0
    );
  }

  
  onSort_appointments() {
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

  onPageChange_appointments(page: number) {
    this.page_appointments = page - 1; // Convert to zero-based index
  }

  appointmentDetails(item: any) {
    this.router.navigate(["/job-offers/appointment-details/" + item.appointmentId]);
  }

}
