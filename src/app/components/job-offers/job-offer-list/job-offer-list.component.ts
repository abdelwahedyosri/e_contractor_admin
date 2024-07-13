import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-job-offer-list",
  templateUrl: "./job-offer-list.component.html",
  styleUrls: ["./job-offer-list.component.scss"],
})
export class JobOfferListComponent implements OnInit {
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
    this.loadJobOffers();
    this.jobOfferService.listPublished().subscribe((response: any) => {
      this.list = response.published;
      this.jobOffers = response.published;
      this.applications = response.applications;
      this.applyFilters();
      this.total = this.list.length;
      console.log(response);
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

  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    console.log(this.searchControl);
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
    this.page = page;
    this.applyFilters();
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
