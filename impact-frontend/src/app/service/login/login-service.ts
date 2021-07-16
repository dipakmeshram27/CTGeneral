import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserLogin } from '../../model/userlogin';

import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { env } from 'process';
import { User } from 'src/app/model/user';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  


 userRole:string;
 userName:string;
  constructor(private http: HttpClient,private router: Router) { }
//========================================================
private userSubject: BehaviorSubject<User>;  
loggedIn = new BehaviorSubject<boolean>(false); 
get isLoggedIn() {
return this.loggedIn.asObservable(); 
}
//=======================================================
 
 private token: string = "";
  private role: string[] = [];
  private isAuthenticated: boolean = false;
  private decodedString: string;


 

  public set AuthenticationToken(token: string)
  {
    localStorage.setItem('token',token);
    this.token = token;
  }
  public get AuthenticationToken()
  {
    return this.token;
  }

 
 

  public set IsAuthenticated(isAuthenticated: boolean)
  {
    this.isAuthenticated = isAuthenticated;
  }
  public get IsAuthenticated()
  {

    
    
    if(this.token == "" && this.role==[])
    {
      this.isAuthenticated = false;
    }
    else
    {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

 

  userLogin(login: UserLogin):Observable<any>{
    
    return this.http.post(`${environment.baseUrl}/user/login`, login)
    .pipe(catchError(this.HandleError));
  }

 /* logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['']);
}*/

 
  private HandleError(error: HttpErrorResponse)
  {
    let message: string = "";

    //check the type of error
    if(error.error instanceof ProgressEvent)
    {
      //this was a client side error
      //create a well-defined error message
      message = `CLIENT ERROR: ${error.message}`;
    }
    else
    {
      //this was a server-side error
      message = `SERVER ERROR: ${error.error}`;
    }
    return throwError(message);
  
  }


   
  }


   

