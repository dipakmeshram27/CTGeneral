import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  isNoteExpanded = true;
  showNoteSubmenu: boolean = false;
  routerLinks = [];


  //routerLinksMaster=[{link:'/', name:'dashboard'},{link: '/patient-registration', name:'Patient Registration'},{link:'/schedule', name:'Schedule'},{link:'/patient-details', name:'Patient Details'},{link:'/inbox',name:'Inbox'}];


  constructor(private loginService: LoginService, private router: Router) { 

    const decodedString = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));


    this.loginService.userRole = decodedString.role[0].authority;
    const currentRole = this.loginService.userRole;
    //console.log(currentRole);
    if (currentRole === "ROLE_PHYSICIAN") {

      this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }, { link: '/inbox', name: 'Inbox' }];

    } else if (currentRole === "ROLE_PATINET") {
      this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }];

    }
  }



  ngOnInit(): void {

  /*  const decodedString = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));


    this.loginService.userRole = decodedString.role[0].authority;
    const currentRole = this.loginService.userRole;
    console.log(currentRole);
    if (currentRole === "ROLE_PHYSICIAN") {

      this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }, { link: '/inbox', name: 'Inbox' }];

    } else if (currentRole === "ROLE_PATINET") {
      this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }];

    }else{
      this.routerLinks=[{link:''}];
    }*/

  }

}








/* getDashboard(){
 if(this.loginService.UserRole==['ROLE_PATIENT'] || this.loginService.UserRole==['ROLE_NURSE'] || this.loginService.UserRole==['ROLE_PHYSICIAN'] || this.loginService.UserRole==['ROLE_ADMIN']){
   return true;
 }
 else{
  return false;
 }
}

getEmpReg(){
if(this.Role=='ROLE_ADMIN'){
  return true;
}
else{
 return false;
}

}
getInbox(){
if(this.Role=='ROLE_PATIENT' || this.Role=='ROLE_NURSE' || this.Role=='ROLE_PHYSICIAN'){
  return true
}else{
  return false;
}
}*/







