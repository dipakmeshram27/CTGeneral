import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  name="";
  currentRole="";
  


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  isLoggedIn$: Observable<boolean>;

  //routerLinksMaster=[{link:'/', name:'dashboard'},{link: '/patient-registration', name:'Patient Registration'},{link:'/schedule', name:'Schedule'},{link:'/patient-details', name:'Patient Details'},{link:'/inbox',name:'Inbox'}];


  constructor(private loginService: LoginService, private router: Router) { }



  ngOnInit(): void {

    this.name=this.loginService.userName;
  this.currentRole=this.loginService.userRole;
  
  if(this.currentRole){
    this.currentRole= this.currentRole.split('_')[1];
  }
  
    

    this.isLoggedIn$ = this.loginService.isLoggedIn;
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: any) => {
        // your logic to get role from login service
        this.currentRole = this.loginService.userRole;
        this.name=this.loginService.userName;
      
        if (this.currentRole === "ROLE_PHYSICIAN") {
          this.loginService.loggedIn.next(true);
          this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }, { link: '/inbox', name: 'Inbox' }];

        } else if (this.currentRole === "ROLE_PATIENT") {
          this.loginService.loggedIn.next(true);
          this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' }];

        }

      });
}


toggleSidebar() {
  this.toggleSidebarForMe.emit();
}

}
















