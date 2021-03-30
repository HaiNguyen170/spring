import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null,
    address:null,
    phonenumber:null,
    falcuty:1,
    role :["student"]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password,address,phonenumber,falcuty,role } = this.form;
    let falcuty_code = "";
    if(falcuty===1) falcuty_code = "SE";
    else if(falcuty===2) falcuty_code = "IB";
    else if(falcuty===3) falcuty_code = "AI";
    else if(falcuty===4) falcuty_code = "SA";

    this.authService.register(name, email, password,address,phonenumber,falcuty_code,role).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  RegisterAnotherAccount(){
    this.isSuccessful = false;
  }
}