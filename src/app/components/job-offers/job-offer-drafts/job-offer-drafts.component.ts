import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from 'src/app/shared/service/job-offer.service';

@Component({
  selector: 'app-job-offer-drafts',
  templateUrl: './job-offer-drafts.component.html',
  styleUrls: ['./job-offer-drafts.component.scss']
})
export class JobOfferDraftsComponent implements OnInit {
  public jobOffers = [] as any;
  public applications = [] as any;
  public total = 0;
  public page = 0;
  public pageSize = 10;
  public sortColumn = "";
  public sortDirection = "";
  public searchControl = "";

  constructor(
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobOffers();
    this.jobOfferService.listDrafts().subscribe((response: any) => {
      this.jobOffers = response.drafts;
      this.total = this.jobOffers.length;
      console.log(response);
      // this.refresh();
      // this.searchText = '';
      // this.filtersForm.valueChanges.subscribe(() => {
      //   this.applyFilters();
      // });
      // this.loader = false;
    });
  }

  loadJobOffers() {}

  getJobApplicationsCount(jobOffer: any): number {
    return (
      this.applications.filter(
        (application: any) => application.jobOffer.offerId == jobOffer.offerId
      ).length || 0
    );
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
    this.loadJobOffers();
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

  jobOfferDetails(item: any) {
    this.router.navigate(["/job-offers/offer-details/" + item.reference]);
  }
}