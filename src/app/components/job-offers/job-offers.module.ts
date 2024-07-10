import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "src/app/shared/shared.module";
import { JobOfferListComponent } from "./job-offer-list/job-offer-list.component";
import { JobOfferDetailsComponent } from "./job-offer-details/job-offer-details.component";
import { JobOfferDraftsComponent } from "./job-offer-drafts/job-offer-drafts.component";
import { JobOffersRoutingModule } from "./job-offers.routing";
import { JobApplicationDetailsComponent } from './job-application-details/job-application-details.component';
import { JobOffersDashboardComponent } from './job-offers-dashboard/job-offers-dashboard.component';
import { JobOfferApplicationsComponent } from './job-offer-applications/job-offer-applications.component';
import { JobOfferFilesComponent } from './job-offer-files/job-offer-files.component';
import { JobOfferAppointmentsComponent } from './job-offer-appointments/job-offer-appointments.component';
import { JobOfferSkillsComponent } from './job-offer-skills/job-offer-skills.component';
import { JobAppointmentDetailsComponent } from './job-appointment-details/job-appointment-details.component';

@NgModule({
  declarations: [
    JobOfferListComponent,
    JobOfferDetailsComponent,
    JobOfferDraftsComponent,
    JobApplicationDetailsComponent,
    JobOffersDashboardComponent,
    JobOfferApplicationsComponent,
    JobOfferFilesComponent,
    JobOfferAppointmentsComponent,
    JobOfferSkillsComponent,
    JobAppointmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    JobOffersRoutingModule,
  ],
})
export class JobOffersModule {}
