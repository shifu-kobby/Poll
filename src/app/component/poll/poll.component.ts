import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Candidate, Poll, User } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { UserState } from 'src/app/store/state/user.state';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  candidates: Candidate[] | any;
  selectedCandidate: Candidate | undefined;
  selectedPollId: Poll | any;
  poll: Poll | any;
  voteCasted: boolean = false;
  pausedPoll: boolean = false;
  stoppedPoll: boolean = false;
  constructor(private pollService: PollServiceService, private store: Store<UserState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selectedPollId = params['id'];
      }
      )
    if (this.selectedPollId) {
      this.pollService.getPollById(this.selectedPollId)
        .subscribe((res: Poll) => {
          this.poll = res;
          this.pausedPoll = res.pollStatus === "PAUSED"? true: false;
          this.stoppedPoll = res.pollStatus === "FINISHED"? true: false;
          this.candidates = res?.candidates
        })
    }
  }

  select(candidate: Candidate) {
    this.selectedCandidate = candidate;
  }

  vote() {
    let tempPoll = this.poll;
    delete tempPoll.userId;

    if (this.selectedCandidate) {
      let updatedCandidate = {
        ...this.selectedCandidate,
        score: this.selectedCandidate.score + 1,
        pollId: tempPoll
      }

      this.pollService.updateCandidate(updatedCandidate.candidateId, updatedCandidate)
        .subscribe((res: Candidate) => {
          if (res) {
            console.log('candidate updated successfully');
            this.voteCasted = true;
          }
        })
    }
  }
}
