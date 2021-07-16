import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/model/userlogin';
import { LoginService } from 'src/app/service/login/login-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    //routerLinksMaster=[{link:'/', name:'dashboard'},{link: '/patient-registration', name:'Patient Registration'},{link:'/schedule', name:'Schedule'},{link:'/patient-details', name:'Patient Details'},{link:'/inbox',name:'Inbox'}];
    isLoggedIn$: Observable<boolean>;
  constructor(private loginService:LoginService, private router:Router) {
   
   }

  ngOnInit(): void { 
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    let logOut=localStorage.clear();
    this.router.navigate(['']);
    

  }
 
}
