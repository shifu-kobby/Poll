import { Component, OnInit } from '@angular/core';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Poll, User } from 'src/app/model';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/store/state/user.state';
import { select, Store } from '@ngrx/store';
import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: String | undefined;
  password: String | undefined;
  polls: Poll[] | any;
  selection: any;
  dataSource: any;
  displayedColumns: string[] | undefined;
  userInfo: User | any;
  paused: boolean = false;
  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  ).subscribe((res: User) => {
    this.userInfo = res;
    this.userName = this.userInfo.userName;
    this.password = this.userInfo.passwords;
    this.polls = this.userInfo.polls;

    this.dataSource = new MatTableDataSource<Poll>(this.polls);
    this.displayedColumns = ['name', 'description', 'startDate', 'endDate', 'status', 'arrow', 'stop', 'monitor', 'delete'];
    this.selection = new SelectionModel<Poll>(true, []);
  }
  )

  constructor(private pollService: PollServiceService, private store: Store<UserState>, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Poll): string {

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pollId + 1}`;
  }

  initiatePoll(row: Poll) {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }

    let updatedPoll = { ...row, pollStatus: "IN PROGRESS", userId: tempUserInfo };

    this.pollService.updatePoll(updatedPoll, row.pollId)
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

  pausePoll(row: Poll) {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }
    let updatedPoll = { ...row, pollStatus: "PAUSED", userId: tempUserInfo }

    this.pollService.updatePoll(updatedPoll, row.pollId)
      .subscribe((res: Poll) => {
        console.log(res);

        if (res) {
          this.paused = true;
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

  endPoll(row: Poll) {
    let tempUserInfo: any = {
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      userName: this.userInfo.userName,
      passwords: this.userInfo.passwords,
    }
    let updatedPoll = { ...row, pollStatus: "FINISHED", userId: tempUserInfo }

    this.pollService.updatePoll(updatedPoll, row.pollId)
      .subscribe((res: Poll) => {
        console.log(res);

        if (res) {
          this.paused = true;
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

  monitorPoll(row: Poll) {
    this.router.navigate(['/monitor'], {
      relativeTo: this.route,
      queryParams: {
        userName: this.userName,
        id: row.pollId
      },
      queryParamsHandling: 'merge'
    })
  }

  deletePoll(row: Poll) {
    // this.polls.forEach((poll: Poll, i: number) => {
    //   if(poll.pollId === row.pollId) {
    //     console.log(i);
    //     this.polls.splice(i, 1);
    //   }
    // });
    console.log(this.polls);
    console.log(row);


    // let tempUserInfo = {
    //   ...this.userInfo,
    //   polls: this.polls
    // }
    // console.log(tempUserInfo);

    // this.pollService.deletePoll(row.pollId);
    // .subscribe((status) => {
    //   console.log(status);

    //   if(status){
    //     console.log('here');

    //     this.pollService.getUserById(this.userInfo.userId)
    //     .subscribe((res: User) => {
    //       localStorage.setItem('currentUser', JSON.stringify(res));
    //       this.store.dispatch(userActions.GetCurrentUser({
    //         payload: res
    //       }));
    //     }
    //     )
    //   }
    // })

  }
}
