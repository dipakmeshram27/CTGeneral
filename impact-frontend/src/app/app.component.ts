import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from './service/login/login-service';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Dashboard';

 


  sidebarOpened=true;


  constructor(private currentRoute: ActivatedRoute,
    private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {

    
    if(localStorage.getItem('token')){
      this.loginService.AuthenticationToken=localStorage.getItem('token');
      this.loginService.IsAuthenticated=true;
      let decodedString = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      this.loginService.loggedIn.next(true);
      this.loginService.userRole = decodedString.role[0].authority;
  }

  this.router.events
  .pipe(filter((event) => event instanceof NavigationEnd))
  .subscribe((e: any) => {
    if(e.url==="/"){
      this.sidebarOpened=false;
    }
   });

  }
  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
    
  }
 
}
