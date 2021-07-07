import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user/user-service';
import {ActivatedRoute} from'@angular/router';
import {ToastService} from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-view-all-patients',
  templateUrl: './view-all-patients.component.html',
  styleUrls: ['./view-all-patients.component.css']
})
export class ViewAllPatientsComponent implements OnInit {

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
    this.userService.getUsers().subscribe((val:User[]) => {
      console.log(val);

      this.user = [];
      this.user = this.user.filter((userObj)=>{
      return userObj.role === 3;
      })
      this.user = val;
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
