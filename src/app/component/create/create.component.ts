import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Candidate, Poll, User } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { UserState } from 'src/app/store/state/user.state';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLinear = true;
  pollCreateForm: any;
  pollData: Poll | any;
  candidateData: Candidate[] | any = [];
  currentUser: User | any;
  submitted: boolean= false;
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  )

  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService, private store: Store<UserState>,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pollCreateForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      candidates: this._formBuilder.array([]),
      start: [new Date(year, month, 1), Validators.required],
      end: [new Date(year, month, 5), Validators.required],
    });
    this.user$.subscribe((res: User) => {
      this.currentUser = res;
    })

  }

  candidates(): FormArray {
    return this.pollCreateForm.get("candidates") as FormArray
  }

  newCandidate(): FormGroup {
    return this._formBuilder.group({
      candidate: ''
    })
  }

  addCandidate() {
    this.candidates().push(this.newCandidate());
  }

  removeCandidate(i: number) {
    this.candidates().removeAt(i);
  }

  submit() {
    this.pollData = {
      "pollName": this.pollCreateForm.value.name,
      "pollDescription": this.pollCreateForm.value.description,
      "pollStatus": "PENDING",
      "startDate": this.pollCreateForm.value.start,
      "endDate": this.pollCreateForm.value.end,
      "userId": this.currentUser
    }

    this.pollCreateForm.value.candidates.map((candidate: any) => {
      this.candidateData.push(
        {
          "candidateName": candidate.candidate,
          "score": 0,
          "pollId": ""
        }
      )
    })

    this.pollService.createPoll(this.pollData)
      .subscribe(poll => {
        if (poll) {
          this.candidateData.forEach((candidate: { pollId: Poll; }) => {
            candidate.pollId = poll
          })

          this.candidateData.map((candidate: Candidate) => {
            this.pollService.addCandidates(candidate)
              .subscribe(res => {
                if(res){
                  this.submitted = true;
                  this.pollService.getUserById(poll.userId.userId)
                      .subscribe((res: User) => {
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        this.store.dispatch(userActions.GetCurrentUser({
                          payload: res
                        }));
                      }
                      )
                }
              }
              )
          })
        }
      }
      )
  }

  navigateToMonitor(){
    this.router.navigate(['/home'], {
      relativeTo: this.route,
      queryParams: {
        userName: this.currentUser.userName,
      },
      queryParamsHandling: 'merge'
    })
  }
}
