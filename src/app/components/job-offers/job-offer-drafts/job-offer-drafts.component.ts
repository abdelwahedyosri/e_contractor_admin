import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";

@Component({
  selector: "app-job-offer-drafts",
  templateUrl: "./job-offer-drafts.component.html",
  styleUrls: ["./job-offer-drafts.component.scss"],
})
export class JobOfferDraftsComponent implements OnInit {
  public list = [] as any;
  public jobOffers = [] as any;
  public applications = [] as any;
  public total = 0;
  public page = 1;
  public pageSize = 10;
  public sortColumn = "";
  public sortDirection = "";
  public searchControl = new FormControl("");

  constructor(
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobOfferService.listDrafts().subscribe((response: any) => {
      this.list = response.drafts;
      this.total = this.list.length;
      console.log(response);
      this.applyFilters();
    });
  }

  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.jobOffers = this.list
      .filter((jobOffer: any) => {
        return (
          !this.searchControl ||
          jobOffer.jobTitle
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.description
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.tasksDescription
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.reference
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.country
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.city
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.location
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          jobOffer.jobContract
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase())
        );
      })
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getJobApplicationsCount(jobOffer: any): number {
    return (
      this.applications.filter(
        (application: any) => application.jobOffer.offerId == jobOffer.offerId
      ).length || 0
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

  jobOfferDetails(item: any) {
    this.router.navigate(["/job-offers/offer-details/" + item.reference]);
  }
}
