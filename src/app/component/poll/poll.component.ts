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
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  )
  selectedPollId: Poll | any;
  constructor(private pollService: PollServiceService, private store: Store<UserState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCandidatesForPoll();
  }

  getCandidatesForPoll() {
    this.route.queryParams
      .subscribe(params => {
        this.selectedPollId = params['id'];
      }
      )
    if (this.selectedPollId) {
      this.pollService.getPollById(this.selectedPollId)
        .subscribe((res: Poll) => {
          console.log(res);
          this.candidates = res?.candidates
          console.log(this.candidates);

        })
    }
  }

  vote(candidate: Candidate) {
    let updatedCandidate = {...candidate, score: candidate.score + 1}
    console.log(updatedCandidate);

    // this.pollService.updateCandidate(updatedCandidate.candidateId, updatedCandidate)
    // .subscribe((res: Candidate) => console.log(res)
    // )
  }
}
