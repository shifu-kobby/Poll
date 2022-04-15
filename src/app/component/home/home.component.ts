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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pollService: PollServiceService, private store: Store<UserState>) { }

  public readonly user$: Observable<User> | any = this.store.pipe(
    select(userSelectors.getCurrentUser)
  )
  polls: Poll[] | undefined;
  selection: any;
  dataSource: any;
  displayedColumns: string[] | undefined;

  ngOnInit(): void {
    this.user$.subscribe((res: User) => {
      this.polls = res.polls;
    }
    )
    this.dataSource = new MatTableDataSource<Poll>(this.polls);
    this.displayedColumns = ['select', 'id', 'name', 'description', 'user', 'startDate', 'endDate', 'status'];
    this.selection = new SelectionModel<Poll>(true, []);
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
}
