import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { baseUrl } from 'src/app/common';
import { Candidate, Poll } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  value = "";
  selectedPollId: number | undefined;
  selectedPoll: Poll | any;
  candidates: Candidate[] | any;
  chartDatasets: any;
  chartLabels: string[] | any;
  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  chartOptions: any = {
    responsive: true
  };
  votingLink = "";

  constructor(private pollService: PollServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCandidatesForPoll();
  }

  getCandidatesForPoll() {
    let labels: String[] = [];
    let scores: Number[] = [];
    this.route.queryParams
      .subscribe(params => {
        this.selectedPollId = params['pollId'];
      }
      )
    if (this.selectedPollId) {
      this.pollService.getPollById(this.selectedPollId)
        .subscribe((res: Poll) => {
          this.selectedPoll = res;
          res.candidates.forEach((candidate: Candidate) => {
            labels.push(candidate.candidateName)
            scores.push(candidate.score)
          })
          this.chartLabels = labels;
          this.chartDatasets = [{data: scores, label: res.pollName }]
          this.votingLink = `${baseUrl}/poll?name=${res.pollName}`;
        })
    }
  }
  search() {
    console.log(this.value);
  }
  chartType = 'pie';
  chartTypeBar = 'bar';



  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }

}
