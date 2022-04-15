import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { UserState } from 'src/app/store/state/user.state';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  signInFormGroup: any;
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  )

  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService, private router: Router,
    private store: Store<UserState>) { }

  ngOnInit(): void {
    this.signInFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      passwords: ['', Validators.required],
    });
  }

  login() {
    this.pollService.getUserById(this.signInFormGroup.value.userName, this.signInFormGroup.value.passwords)
      .subscribe(res => {
        if (res) {
          this.store.dispatch(userActions.GetCurrentUser({
            payload: res
          }));
          this.router.navigate(['/home'])
        }
        else {
          console.log("something went wrong");

        }
      }
      )
  }
}
