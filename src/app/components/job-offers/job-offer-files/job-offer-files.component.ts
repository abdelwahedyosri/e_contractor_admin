import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-job-offer-files",
  templateUrl: "./job-offer-files.component.html",
  styleUrls: ["./job-offer-files.component.scss"],
})
export class JobOfferFilesComponent implements OnInit {
  public files = [] as any;
  public list = [] as any;
  public applications = [] as any;
  public total = 0;
  public page = 0;
  public pageSize = 10;
  public sortColumn = "";
  public sortDirection = "";
  public searchControl = new FormControl("");

  constructor(
    private jobOfferService: JobOfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobOfferService.listFiles().subscribe((response: any) => {
      this.list = response.files;
      this.applyFilters();
      this.total = this.list.length;
    });
  }

  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.files = this.list
      .filter((file: any) => {
        return (
          !this.searchControl ||
          file?.jobApplication?.jobOffer.jobTitle
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.description
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.tasksDescription
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.reference
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.country
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.city
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.location
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobApplication?.jobOffer.jobContract
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.applicationFileType
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobFile?.fileExtension
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          file?.jobFile?.fileOriginalName
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
