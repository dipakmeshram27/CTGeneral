import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { UserLogin } from 'src/app/model/userlogin';
import {LoginService} from 'src/app/service/login/login-service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  submitted = false;


  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),


    })
  }





  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
 

  get f() { return this.form.controls; }

  

  submit() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
    
  let userLogin: UserLogin= this.form.value;
 
this.loginService.userLogin(userLogin).subscribe(value => {
console.log(value);
    console.log(this.form.value);
  })
}

}
}