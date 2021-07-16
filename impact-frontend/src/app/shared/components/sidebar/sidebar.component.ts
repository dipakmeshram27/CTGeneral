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
        console.log(e);
        

        // your logic to get role from login service
        this.currentRole = this.loginService.userRole;
        this.name=this.loginService.userName;
      
        if (this.currentRole === "Physician") {
          this.loginService.loggedIn.next(true);
          this.routerLinks = [{ link: '/', name: 'Dashboard' }, { link: '/inbox', name: 'Inbox' },{ link: '/patient-details', name: 'Patient Details' },{ link: '/visit', name: 'Vital Signs' },{link:'/diagnosis',name:'Diagnosis'},{link:'/procedure',name:'Procedure'},{link:'/medication',name:'Medications'}];

        } else if (this.currentRole === "Patient") {
          this.loginService.loggedIn.next(true);
          this.routerLinks = [{ link: '/', name: 'Dashboard' }, { link: '/inbox', name: 'Inbox' }, { link: '/patient-details', name: 'Patient Details' }];

        }
       else if (this.currentRole === "Admin") {
        this.routerLinks = [{ link: '/', name: 'Dashboard' }, { link: '/employee-registration', name: 'Employee Registration' },{ link: '/view-employee', name: 'View All Employee' },{ link: '/view-patient', name: 'View All Patient' }];

      }
 
      });
}


toggleSidebar() {
  this.toggleSidebarForMe.emit();
}

}
















