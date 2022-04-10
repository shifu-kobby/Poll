import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PollServiceService } from 'src/app/service/poll-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  signInFormGroup: any;
  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService) { }

  ngOnInit(): void {
    this.signInFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      passwords: ['', Validators.required],
    });
  }

  login(){
    console.log(this.signInFormGroup.value);
    this.pollService.getUserById(this.signInFormGroup.value.email, this.signInFormGroup.value.passwords)
    .subscribe(res => console.log(res)
    )
  }
}
