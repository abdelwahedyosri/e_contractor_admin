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
  job_application_details_timeline,
  job_categories,
  job_contracts,
  job_offer_application_steps,
  job_offer_form_steps,
  job_offer_timeline_employer,
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
  selector: "app-job-application-details",
  templateUrl: "./job-application-details.component.html",
  styleUrls: ["./job-application-details.component.scss"],
})
export class JobApplicationDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private jobOfferService: JobOfferService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reference = this.activatedRoute.snapshot.params["reference"];
    this.reference = this.activatedRoute.snapshot.params["reference"];
    this.currentRoute = window.location.pathname + "/";

    this.jobOfferService
      .getJobApplication(this.reference)
      .subscribe((response: any) => {
        this.job_application = response.jobApplication;
        this.job_offer = response.jobApplication.jobOffer;
        this.job_application_appointments = response.jobApplicationAppointments;
        const skills =
          this.job_offer.skills != null ? this.job_offer.skills.split(",") : [];
        this.job_offer.skills = skills;

        this.is_application_file_resume =
          this.job_application.jobApplicationFiles.some(
            (file: any) => file.applicationFileType == "Resume"
          );
        this.applicationResume = this.job_application.jobApplicationFiles.find(
          (file: any) => file.applicationFileType == "Resume"
        );
        this.applicationMakeYourCaseFile =
          this.job_application.jobApplicationFiles.find(
            (file: any) => file.applicationFileType == "Make Your Case"
          );
      });
  }
  job_application_appointments = [] as any;

  currentRoute: string;

  jobOfferTimeline = job_offer_timeline_employer;
  reference = "";
  applicationResume = {} as any;
  applicationMakeYourCaseFile = {} as any;

  loader = true;
  job_offer = {
    jobTitle: "",
    description: "",
    tasksDescription: "",
    type: "FullTime",
    workspaceType: "OnSite",
    jobContract: "CDI",
    country: "TN",
    city: "",
    location: "",
    renumeration: "",
    renumerationPeriod: "Monthly",
    renumerationCurrency: "TND",
    category: "InformationTechnology",
    openPositions: 1,
    deadline: null,
    educationLevel: "HighSchool",
    experience: "NoExperience",
    language: "English",
    skills: [] as any,
    requirements: [] as any,
    allowSimpleApplications: false,
    status: "",
    isDeleted: false,
    reference: this.reference,
    jobApplications: [],
    employer: {
      companyName: "",
    },
    publishingDate: new Date(),
  };

  group = {
    href: "",
    name: "",
  } as any;

  is_application_file_resume = false;

  job_application = {
    jobOffer: {
      jobTitle: "",
      description: "",
      tasksDescription: "",
      type: "FullTime",
      workspaceType: "OnSite",
      jobContract: "CDI",
      country: "TN",
      city: "",
      location: "",
      renumeration: "",
      renumerationPeriod: "Monthly",
      renumerationCurrency: "TND",
      category: "InformationTechnology",
      openPositions: 1,
      deadline: null,
      educationLevel: "HighSchool",
      experience: "NoExperience",
      language: "English",
      skills: [] as any,
      requirements: [] as any,
      allowSimpleApplications: false,
      status: "",
      isDeleted: false,
      reference: this.reference,
      jobApplications: [],
      publishingDate: new Date(),
      employer: {
        companyName: "",
      },
    },
  } as any;

  jobTypes = job_types;
  jobWorkplaces = job_workplaces;
  jobContracts = job_contracts;
  jobCountries = countries;
  jobRenumerationPeriods = renumeration_periods;
  jobRenumerationCurrencies = currencies;
  jobCategories = job_categories;
  educationLevels = education_levels;
  employmentExperiences = employment_experiences;
  requirementExperiences = employment_experiences.filter(
    (req: any) => req.value != "NoExperience"
  );

  studentApplicationTimeline = job_application_details_timeline;
  submittedApplicationSteps = job_offer_application_steps;

  languages = languages;

  refreshRoute() {
    this.currentRoute = window.location.pathname + "/";
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

  consultJobOffer(offer: any) {
    this.router.navigate([`/discover-job-offers/jobs/${offer.reference}`]);
  }

  downloadFile(fileName: string) {
    this.jobOfferService.downloadFile(fileName).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error("File download failed", error);
      }
    );
  }

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

  getFormatText(text: any) {
    return formatText(text);
  }

  view(fileName: string) {
    const url = this.jobOfferService.getFile(fileName);
    if (url) {
      window.open(url, "_blank");
    }
  }

  download(fileName: string) {
    this.jobOfferService.downloadFile(fileName).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error("File download failed", error);
      }
    );
  }

  appointmentDetails(item: any) {
    this.router.navigate(["/job-offers/appointment-details/" + item.appointmentId]);
  }

}
