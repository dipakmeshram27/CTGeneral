import { Injectable, NgModule } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './service/login/login-service';
//import * as jwt_decode  from 'jwt-decode';
//import jwt_decode, { JwtPayload }  from 'jwt-decode';

import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  constructor(private router: Router, private loginService: LoginService){}
 
 
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     //===================================================
     
    // let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiZGV2ZWxvcGVyIn0.mdoPQqMAoldTzjg_J-F838DZGiSBiqVEAlOMdZ0WAjg";

     

      //let expectedRoleArray = route.data;
    //  expectedRoleArray = expectedRoleArray.expectedRole;

      //const token = localStorage.getItem('jwt');

      // decode the token to get its payload
    //const tokenPayload = jwt_decode(token);
    //const tokenPayload = jwt_decode<JwtPayload>(token) || null;

   

      //console.log(tokenPayload);
   
   /*   let  expectedRole = '';
 
    for(let i=0; i<expectedRoleArray.length; i++){
      if(expectedRoleArray[i]==tokenPayload.valueOf){
        console.log("Roles Matched");
        expectedRole = tokenPayload.role;
      }
    }
  
    if (this.loginService.isAuthenticated() && tokenPayload.role == expectedRole) {
      console.log("User permitted to access the route");
      return true;
    }
    return false;*/


     
  //=================================================================   
     
      console.log("guard: " +this.loginService.IsAuthenticated);
    if(this.loginService.IsAuthenticated)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
