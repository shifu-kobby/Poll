import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
      description: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      candidate1: ['', Validators.required],
      candidate2: ['', Validators.required],
      start: [new Date(year, month, 1), Validators.required],
      end: [new Date(year, month, 5), Validators.required],
    });
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
