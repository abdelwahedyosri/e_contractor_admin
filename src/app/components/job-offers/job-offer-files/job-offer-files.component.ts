import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";

@Component({
  selector: "app-job-offer-files",
  templateUrl: "./job-offer-files.component.html",
  styleUrls: ["./job-offer-files.component.scss"],
})
export class JobOfferFilesComponent implements OnInit {
  public files = [] as any;
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
    this.jobOfferService.listFiles().subscribe((response: any) => {
      this.files = response.files;
      this.total = this.files.length;
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
}
