import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

import { UserService } from '../../service/user/user-service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  public title=[
    {'id':1, 'name':"Mr."},
    {'id':2, 'name':"Ms."},
    {'id':3, 'name':"Mrs."},
    {'id':4, 'name':"Dr."}
  ];
  reactiveForm: FormGroup;
  submitted:boolean = false;

  

  get f() { return this.reactiveForm.controls; } 
  constructor(private formBuilder: FormBuilder, private userService:UserService) {

      this.reactiveForm= this.formBuilder.group({
        
    title: new FormControl(),
    firstName : new FormControl('',[Validators.required,Validators.minLength(2)]),
    lastName : new FormControl('',[Validators.required,Validators.minLength(2)]),
    email:new FormControl('',[Validators.required,Validators.minLength(15),Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
    dateOfBirth: new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confpassword: new FormControl('',[Validators.required])
    
  },{

      validators:this.mustmatch('password','confpassword')
  

      })
   }

   ngOnInit(): void {
    this.userService.getUsers().subscribe(val => {
      console.log(val);
      })
      
  }
  mustmatch(controlname:string, matchingcontrolname:string){
    return(formGroup:FormGroup)=>{
      const control=formGroup.controls[controlname]
      const matchingcontrol=formGroup.controls[matchingcontrolname]

      if(matchingcontrol.errors && !matchingcontrol.errors.mustmatch){
        return
      }
      if(control.value != matchingcontrol.value){
        matchingcontrol.setErrors({mustmatch:true})
      }
      else{
        matchingcontrol.setErrors(null)
      }
    }
  }

  onSubmit(){
    this.submitted = true;
    if (this.reactiveForm.invalid) {
    return;
    }
    else{
      console.log(this.reactiveForm.value);
      let newUser: User= this.reactiveForm.value;
     newUser.role = 1;
      this.userService.createUser(newUser).subscribe(value => {
      console.log(value);
      })
    }
    }

    

  
 


}
