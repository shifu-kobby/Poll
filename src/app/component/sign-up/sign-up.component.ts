import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PollServiceService } from 'src/app/service/poll-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
hide = true;
signUpFormGroup: any;
  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService) { }

  ngOnInit(): void {
    this.signUpFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      passwords: ['', Validators.required],
    });
  }

  signUp(){
    console.log(this.signUpFormGroup.value);
    this.pollService.userSignUp(this.signUpFormGroup.value)
    .subscribe(res => console.log(res)
    )
  }

}
