import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { JobOfferListComponent } from "./job-offer-list/job-offer-list.component";
import { JobOfferDraftsComponent } from "./job-offer-drafts/job-offer-drafts.component";
import { JobOfferDetailsComponent } from "./job-offer-details/job-offer-details.component";
import { JobApplicationDetailsComponent } from "./job-application-details/job-application-details.component";
import { JobOffersDashboardComponent } from "./job-offers-dashboard/job-offers-dashboard.component";
import { JobOfferSkillsComponent } from "./job-offer-skills/job-offer-skills.component";
import { JobOfferFilesComponent } from "./job-offer-files/job-offer-files.component";
import { JobOfferApplicationsComponent } from "./job-offer-applications/job-offer-applications.component";
import { JobOfferAppointmentsComponent } from "./job-offer-appointments/job-offer-appointments.component";
import { JobAppointmentDetailsComponent } from "./job-appointment-details/job-appointment-details.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: JobOffersDashboardComponent,
        data: {
          title: "Job Offers",
          breadcrumb: "Job Offers",
        },
      },
      {
        path: "list-offers",
        component: JobOfferListComponent,
        data: {
          title: "Job Offers List",
          breadcrumb: "Job Offers List",
        },
      },
      {
        path: "drafts-offers",
        component: JobOfferDraftsComponent,
        data: {
          title: "Job Offers Drafts",
          breadcrumb: "Job Offers Drafts",
        },
      },
      {
        path: "offer-details/:reference",
        component: JobOfferDetailsComponent,
        data: {
          title: "Job Offer Details",
          breadcrumb: "Job Offer Details",
        },
      },
      {
        path: "job-applications",
        component: JobOfferApplicationsComponent,
        data: {
          title: "Job Applications",
          breadcrumb: "Job Applications",
        },
      },
      {
        path: "job-appointments",
        component: JobOfferAppointmentsComponent,
        data: {
          title: "Job Appointments",
          breadcrumb: "Job Appointments",
        },
      },
      {
        path: "application-details/:reference",
        component: JobApplicationDetailsComponent,
        data: {
          title: "Application Details",
          breadcrumb: "Application Details",
        },
      },
      {
        path: "appointment-details/:appointmentId",
        component: JobAppointmentDetailsComponent,
        data: {
          title: "Appointment Details",
          breadcrumb: "Appointment Details",
        },
      },
      {
        path: "job-files",
        component: JobOfferFilesComponent,
        data: {
          title: "Job Files",
          breadcrumb: "Job Files",
        },
      },
      {
        path: "job-skills",
        component: JobOfferSkillsComponent,
        data: {
          title: "Job Skills",
          breadcrumb: "Job Skills",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOffersRoutingModule {}
