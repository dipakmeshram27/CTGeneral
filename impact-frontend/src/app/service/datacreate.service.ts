import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatacreateService 
{
 
  url: string="http://localhost:8080/user";
  
  constructor(private http:HttpClient) { }

  getData()
  {
    return this.http.get(`${this.url}/getAllUser`);
  }

  createPost(employee:User)
  {
    return this.http.post(`${this.url}/addUser`, employee);
  }
  
}
