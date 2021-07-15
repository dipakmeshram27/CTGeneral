import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    

  })
  constructor() { }

  ngOnInit(): void {
  }
  get email(){
    return this.form.get('email');
  }
 
  submit()
  {
    console.log(this.form.value);
  }

}
