import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Poll } from 'src/app/model';
import { PollServiceService } from 'src/app/service/poll-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLinear = true;
  pollCreateForm: any;
  pollData: Poll | any;
  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService) { }

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
    console.log(this.pollCreateForm.value);
    this.pollService.createPoll(this.pollData)
    .subscribe(res => console.log(res)
    )
  }

}
