import { Component, OnInit } from '@angular/core';
import { PollServiceService } from 'src/app/service/poll-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Poll } from 'src/app/model';


const ELEMENT_DATA: Poll[] = [
  {
    pollId: 1,
    pollName: "name",
    pollDescription: "description",
    pollStatus: "status",
    startDate: "start",
    endDate: "end",
    userId: {
      userId: 1,
      email: "user1@email.com",
      firstName: "firstName",
      lastName: "lastName",
      passwords: "password",
      polls: [1],
      userName: "userName"
    }
  },
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pollService: PollServiceService) { }
  polls: Poll[] | undefined;
  selection: any;
  dataSource: any;
  displayedColumns: string[] | undefined;

  ngOnInit(): void {
    this.pollService.getPolls()
      .subscribe((data: any) => {
        console.log(data);
        this.polls = data;
        this.dataSource = new MatTableDataSource<Poll>(this.polls);
      })

    this.displayedColumns = ['select', 'id', 'name', 'description', 'user', 'startDate', 'endDate', 'status'];
    this.selection = new SelectionModel<Poll>(true, []);

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
