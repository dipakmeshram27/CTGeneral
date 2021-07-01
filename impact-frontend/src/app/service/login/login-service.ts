import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserLogin } from '../../model/userlogin';

import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { env } from 'process';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

 
  private token: string = "";
  private role: string = "";
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  public set AuthenticationToken(token: string)
  {
    this.token = token;
  }
  public get AuthenticationToken()
  {
    return this.token;
  }

  public set UserRole(role: string)
  {
    this.role = role;
  }
  public get UserRole()
  {
    return this.role;
  }

  public set IsAuthenticated(isAuthenticated: boolean)
  {
    this.isAuthenticated = isAuthenticated;
  }
  public get IsAuthenticated()
  {
    // if(Object.keys(this.token).length == 0)
    if(this.token == "")
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

 /* getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`);
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
