import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLinear = true;
  firstFormGroup: any;
  secondFormGroup: any;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.secondFormGroup = this._formBuilder.group({
      candidates: this._formBuilder.array([]),
      start: [new Date(year, month, 1), Validators.required],
      end: [new Date(year, month, 5), Validators.required],
    });
  }

  candidates() : FormArray {
    return this.secondFormGroup.get("candidates") as FormArray
  }

  newCandidate(): FormGroup {
    return this._formBuilder.group({
      candidate: ''
    })
  }

  addCandidate() {
    this.candidates().push(this.newCandidate());
  }

  removeCandidate(i:number) {
    this.candidates().removeAt(i);
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
