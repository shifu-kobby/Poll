import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PollServiceService } from 'src/app/service/poll-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  signInFormGroup: any;
  constructor(private _formBuilder: FormBuilder, private pollService: PollServiceService, private router: Router,) { }

  ngOnInit(): void {
    this.signInFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      passwords: ['', Validators.required],
    });
  }

  login(){
    this.pollService.getUserById(this.signInFormGroup.value.userName, this.signInFormGroup.value.passwords)
    .subscribe(res => {
      if (res) {
        this.router.navigate(['/home'])
      }
      else {
        console.log("something went wrong");

      }
    }
    )
  }
}
