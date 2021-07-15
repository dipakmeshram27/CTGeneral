import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user-service';
import {ActivatedRoute} from'@angular/router';
import {ToastService} from 'src/app/service/toast/toast.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-view-all-employee',
  templateUrl: './view-all-employee.component.html',
  styleUrls: ['./view-all-employee.component.css']
})
export class ViewAllEmployeeComponent implements OnInit 
{
  user : User[];

  public status=
  [
    {'id':1, 'name':"Active"},
    {'id':2, 'name':"Inactive"},
    {'id':3, 'name':"Blocked"}
  ];

  constructor(public userService:UserService,private router: ActivatedRoute,private toastService: ToastService) { }

  ngOnInit() 
  {
    this.userService.getUsers().subscribe((responceArray:User[]) => 
    {
      console.log(responceArray);
      this.user = [];
      this.user = responceArray.filter((userObj)=>{
        console.log(userObj);
      return userObj.role["roleId"] === 1 || userObj.role["roleId"] === 2;
      })
    })
    
  }

  onStatusChange(status,user)
  {
    console.log(status);
    console.log(user.userId);
    this.userService.setStatus(status,user.userId).subscribe(  data => {
      this.toastService.show(data.statusMessage, { classname: 'bg-success text-light', delay: 5000 })
    },
    error => {
      this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
    })
  }

}
