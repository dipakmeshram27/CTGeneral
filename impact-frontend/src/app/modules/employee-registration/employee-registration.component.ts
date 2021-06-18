import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from 'src/app/model/user';
import { DatacreateService } from 'src/app/service/datacreate.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit 
{
  reactiveForm: FormGroup;
  employee:User;
  ngOnInit(): void {}

  public role=
  [
    {'id':1, 'name':"Physician"},
    {'id':2, 'name':"Nurse"}
  ];

  public title=
  [
    { 'id': "Mr.", 'name': "Mr ." },
    { 'id': "Miss.", 'name': "Miss ." },
    { 'id': "Mrs.", 'name': "Mrs ." },
    { 'id': "Dr.", 'name': "Dr ." }
  ];

  
  submitted:boolean = false;

  get f() 
  { 
    return this.reactiveForm.controls; 
  } 

  constructor(private formBuilder: FormBuilder,private dataCreateService:DatacreateService) 
  {

    this.reactiveForm= this.formBuilder.group(
    {
      title: new FormControl(''),
      firstName : new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName : new FormControl('',[Validators.required,Validators.minLength(3)]),
      password : new FormControl('',[Validators.required,Validators.minLength(8)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      dateOfBirth: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required]),
      userId: new FormControl('',[Validators.required,Validators.minLength(3)]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
    })
   }

  createPost()
  {
    console.log(this.reactiveForm.value);
    this.dataCreateService.createPost(this.reactiveForm.value).subscribe(value => 
      {
        console.log(value);
      }
    )
  }
  onSubmit()
  {
    console.log(this.reactiveForm.value);
  }
  
}
