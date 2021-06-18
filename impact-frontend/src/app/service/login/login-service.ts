import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../../model/userlogin';

import { environment } from '../../../environments/environment';
import { env } from 'process';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }

 
  userLogin(login: UserLogin):Observable<any>{
    return this.http.post(`${environment.baseUrl}/user/login`, login);
  }
 
}
