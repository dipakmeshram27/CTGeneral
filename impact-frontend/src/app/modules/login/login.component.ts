import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/model/userlogin';
import { LoginService } from 'src/app/service/login/login-service';




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
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

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
    } else {

      let userLogin: UserLogin = this.form.value;

      this.loginService.userLogin(userLogin).subscribe(value => {
        this.loginService.AuthenticationToken=value.token;
        this.loginService.IsAuthenticated=true;
       
       
        localStorage.setItem('token',value.token);
        let decodedString = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      
        this.loginService.loggedIn.next(true);

       this.loginService.userRole = decodedString.role[0].authority;
       console.log(this.loginService.userRole)
        this.router.navigate(['/app-dashboard']);
        console.log(value);
        console.log(this.form.value);
      })
    }

  }

 



}