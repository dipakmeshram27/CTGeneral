import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from '../../../environments/environment';
import { SetStatus } from 'src/app/model/SetStatus';
import { ForgotPassword } from 'src/app/model/forgotpassword';
import { ChangePassword } from 'src/app/model/changepassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`);
  }

  //getUsers():Observable<User[]>{
   // return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`);
  //}
  createUser(newUser: User):Observable<any>{
    return this.http.post(`${environment.baseUrl}/user/addUser`, newUser);
  }
  geturrentEmp(userId):Observable<User[]>
  {
    console.log(userId);
    
    return this.http.get<User[]>(`${environment.baseUrl}/user/getUserById/`+userId);
  }

  updateEmp(newUser: User):Observable<any>
  {
    return this.http.put(`${environment.baseUrl}/user/updateUser`,newUser);
  }

  setStatus(status :string,userId:number):Observable<any>
  {
    //console.log(userId);
    const data = {
      userId: userId,
      status: status
    };

    console.log(status);
    console.log(userId);
    return this.http.post(`${environment.baseUrl}/user/editStatusById`,data);
  }
  forgotPassword(forgotPassword: ForgotPassword):Observable<any>{
    
    return this.http.post(`${environment.baseUrl}/user/forgotpassword`, forgotPassword)
    
  }

  changePassword(changePassword: ChangePassword):Observable<any>{
    
    return this.http.put(`${environment.baseUrl}/user/resetpassword`, changePassword)
    
 }

}
