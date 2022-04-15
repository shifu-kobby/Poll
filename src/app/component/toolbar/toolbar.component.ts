import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model';
import { initialUserState, UserState } from 'src/app/store/state/user.state';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: any;
  userName: String | any;
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  )

  constructor(private store: Store<UserState>, private router: Router, ) { }

  ngOnInit(): void {
    this.user$.subscribe((res: User) => {
      this.userName = res.userName;
    })
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.store.dispatch(userActions.GetCurrentUser({
      payload: initialUserState.user
    }));
    this.router.navigate(['/sign-in']);
  }

}
