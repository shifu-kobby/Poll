import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/common';
import { Candidate, Poll, User } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';
import { UserState } from 'src/app/store/state/user.state';

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
  chartType = 'pie';
  chartTypeBar = 'bar';
  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  votingLink = "";
  polls: Poll[] | any;
  userInfo: User | any;
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  ).subscribe((res: User) => {
    this.userInfo = res;
    let labels: String[] = [];
    let scores: Number[] = [];
    this.route.queryParams
      .subscribe(params => {
        this.selectedPollId = params['id'];
      }
      )
    if (this.selectedPollId) {
      this.pollService.getPollById(this.selectedPollId)
        .subscribe((poll: Poll) => {
          this.selectedPoll = poll;
          poll.candidates.forEach((candidate: Candidate) => {
            labels.push(candidate.candidateName)
            scores.push(candidate.score)
          })
          this.chartLabels = labels;
          this.chartDatasets = [{ data: scores, label: poll.pollName }]
          this.votingLink = `${baseUrl}/poll?id=${poll.pollId}`
        })
    }
  })

  constructor(private pollService: PollServiceService, private route: ActivatedRoute, private store: Store<UserState>) { }

  ngOnInit(): void {
  }

  search() {
    console.log(this.value);
  }

  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }

  initiatePoll() {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }

    let updatedPoll = { ...this.selectedPoll, pollStatus: "IN PROGRESS", userId: tempUserInfo };
    console.log(this.selectedPoll);

    console.log(updatedPoll);

    this.pollService.updatePoll(updatedPoll, this.selectedPoll.pollId)
      .subscribe((res: Poll) => {
        if (res) {
          this.pollService.getUserById(this.userInfo.userId)
            .subscribe((res: User) => {
              localStorage.setItem('currentUser', JSON.stringify(res));
              this.store.dispatch(userActions.GetCurrentUser({
                payload: res
              }));
            }
            )
        }
      })
  }

  pausePoll() {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }
    let updatedPoll = { ...this.selectedPoll, pollStatus: "PAUSED", userId: tempUserInfo }

    this.pollService.updatePoll(updatedPoll, this.selectedPoll.pollId)
      .subscribe((res: Poll) => {
        console.log(res);

        if (res) {
          this.pollService.getUserById(this.userInfo.userId)
            .subscribe((res: User) => {
              localStorage.setItem('currentUser', JSON.stringify(res));
              this.store.dispatch(userActions.GetCurrentUser({
                payload: res
              }));
            }
            )
        }
      })
  }

  endPoll() {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }
    let updatedPoll = { ...this.selectedPoll, pollStatus: "FINISHED", userId: tempUserInfo }

    this.pollService.updatePoll(updatedPoll, this.selectedPoll.pollId)
      .subscribe((res: Poll) => {
        console.log(res);

        if (res) {
          this.pollService.getUserById(this.userInfo.userId)
            .subscribe((res: User) => {
              localStorage.setItem('currentUser', JSON.stringify(res));
              this.store.dispatch(userActions.GetCurrentUser({
                payload: res
              }));
            }
            )
        }
      })
  }

}
