import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import {Notes} from '../../model/notes';
import { environment } from '../../../environments/environment';
import { env } from 'process';
import { usernotes } from '../../model/UserNotes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`+'admin');
  }

  //getUsers():Observable<User[]>{
   // return this.http.get<User[]>(`${environment.baseUrl}/user/getAllUser`);
  //}
  createUser(newUser: User):Observable<any>{
    return this.http.post(`${environment.baseUrl}/user/addUser`, newUser);
  }
}
