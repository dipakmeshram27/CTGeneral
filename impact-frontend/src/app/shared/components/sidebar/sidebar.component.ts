import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
 
  //routerLinksMaster=[{link:'/', name:'dashboard'},{link: '/patient-registration', name:'Patient Registration'},{link:'/schedule', name:'Schedule'},{link:'/patient-details', name:'Patient Details'},{link:'/inbox',name:'Inbox'}];
 
  constructor(private loginService: LoginService, private router: Router) { }


 
  ngOnInit(): void {
 
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: any) => {
        // your logic to get role from login service
        const currentRole = this.loginService.userRole;
 
        console.log(currentRole);
        if (currentRole === "Physician") {
          this.loginService.loggedIn.next(true);
          this.routerLinks = [{ link: '/', name: 'dashboard' },{ link: '/inbox', name: 'Inbox' }, { link: '/note', name: 'Note' }];
 
        } else if (currentRole === "Patient") {
          this.routerLinks = [{ link: '/', name: 'dashboard' }, { link: '/patient-details', name: 'Patient Details' },{ link: '/inbox', name: 'Inbox' }];
 
        }
 
      });
}
 
}