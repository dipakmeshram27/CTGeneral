import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import {Notes} from '../../model/notes';
import { environment } from '../../../environments/environment';
import { env } from 'process';
import { usernotes } from '../../model/UserNotes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  user: User =
  {
    title:'',
    userId : null,
    firstName:'',
    lastName:'',
    role:null,
    password:'',
    email:'',
    status:'',
    createdDate:'',
    updatedDate:'',
    phoneNumber: null,
    dateOfBirth: ''
  }

  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`);
  }
  createUser(newUser: User):Observable<any>
  {
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

  setStatus(status : string,userId : number):Observable<any>
  {
    console.log(userId);
    console.log(status);
    return this.http.delete(`${environment.baseUrl}/user/editStatusById/${status}/${userId}`);
  }

}
