import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/model/forgotpassword';
import { ToastService } from 'src/app/service/toast/toast.service';
import { UserService } from 'src/app/service/user/user-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitted=false;
  form = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    

  })
  constructor(private userService:UserService, private router:Router, private toastService:ToastService) { }

  ngOnInit(): void {
  }
  get email(){
    return this.form.get('email');
  }
 
  submit() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {

      let forgotPassword: ForgotPassword = this.form.value;

      this.userService.forgotPassword(forgotPassword).subscribe(value => {
       
        this.toastService.show('Reset Link has been Successfully sent. Please check your mail', { classname: 'bg-success text-light', delay: 5000 })
     
      
       
      
        
        console.log(value);
        console.log(this.form.value);
      })
    }

  }

}
