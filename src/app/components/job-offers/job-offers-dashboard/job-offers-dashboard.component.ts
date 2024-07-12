import { Component, OnInit } from "@angular/core";
import { JobOfferService } from "src/app/shared/service/job-offer.service";

@Component({
  selector: "app-job-offers-dashboard",
  templateUrl: "./job-offers-dashboard.component.html",
  styleUrls: ["./job-offers-dashboard.component.scss"],
})
export class JobOffersDashboardComponent implements OnInit {
  constructor(private jobOfferService: JobOfferService) {}
  ngOnInit(): void {
    this.jobOfferService.getJobOffersKpis().subscribe((response: any) => {
      this.data = response;
      // this.chartOptions = {
      //   series: this.data.jobOffersByStatus.map(
      //     (offer: any) => offer.count
      //   ),
      //   chart: {
      //     type: 'pie',
      //   },
      //   labels: this.data.jobOffersByStatus.map(
      //     (offer: any) => offer.status
      //   ),
      //   colors: ['#FF6384', '#36A2EB'],
      //   title: {
      //     text: 'Job Offers by Status',
      //   },
      // };
      this.loader = false;
    });
  }

  reference = "";
  chartOptions = {
    series: [],
    chart: {
      type: "pie",
    },
    labels: [],
    colors: ["#FF6384", "#36A2EB"], // Customize colors
    title: {
      text: "Job Offers by Status",
    },
  } as any;
  connected_user = {} as any;
  data = {} as any;
  loader = true;
}
