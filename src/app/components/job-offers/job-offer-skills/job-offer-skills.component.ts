import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobOfferService } from "src/app/shared/service/job-offer.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-job-offer-skills",
  templateUrl: "./job-offer-skills.component.html",
  styleUrls: ["./job-offer-skills.component.scss"],
})
export class JobOfferSkillsComponent implements OnInit {
  public list = [] as any;
  public skills = [] as any;
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
    this.jobOfferService.listSkills().subscribe((response: any) => {
      this.list = response.skills;
      this.applyFilters();
      this.total = this.list.length;
    });
  }
  search() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.skills = this.list
      .filter((skill: any) => {
        return (
          !this.searchControl ||
          skill?.label
            .toUpperCase()
            .includes(this.searchControl.value.toUpperCase()) ||
          skill?.employer?.companyName
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

  deleteOrRestore(item: any) {
    const skill_index = this.skills.findIndex(
      (skill: any) => skill.skillId == item.skillId
    );

    if (item.isDeleted == 1) {
      this.jobOfferService
        .restoreSkill(item.skillId)
        .subscribe((response: any) => {
          if (response.skillId) {
            this.skills[skill_index].isDeleted = 0;
          }
        });
    } else {
      this.jobOfferService
        .deleteSkill(item.skillId)
        .subscribe((response: any) => {
          if (response.skillId) {
            this.skills[skill_index].isDeleted = 1;
          }
        });
    }
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
