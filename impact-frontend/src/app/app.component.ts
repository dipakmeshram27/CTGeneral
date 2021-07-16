import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './service/login/login-service';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Dashboard';

  navBarOpened=true;


  sidebarOpened=true;


  constructor(private currentRoute: ActivatedRoute,
    private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
    // console.log(this.currentRoute);
    // this.currentRoute.url.subscribe(url => {
    //   console.log(url)

    //})

    if(localStorage.getItem('token')){
      this.loginService.AuthenticationToken=localStorage.getItem('token');
      this.loginService.IsAuthenticated=true;
      let decodedString = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      this.loginService.loggedIn.next(true);
      this.loginService.userRole = decodedString.role[0].authority;
  }
  }
  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
    
  }
  //=============================================================

 /* title = 'Patient Dashboard';
  sidebarOpened=false;
  private permission: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email: string;

  constructor(private tokenStorageService: TokenStorageService,private currentRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.permission = user.permission;

      this.sidebarOpened=this.permission.includes('ROLE_PHYSICIAN');
     // this.showAdminBoard = this.permission.includes('ROLE_PHYSICIAN');
      //this.showModeratorBoard = this.permission.includes('ROLE_PATIENT');

     // this.email = user.email;
    }
  }

  logout() {
    this.tokenStorageService.logOut();
    window.location.reload();
  }*/
}
