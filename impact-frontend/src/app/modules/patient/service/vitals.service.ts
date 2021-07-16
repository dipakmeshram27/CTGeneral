import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vitals } from '../model/vitals';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  private baseUrl="http://localhost:8081/vital/save";
  constructor(private http: HttpClient) { }

  addVitals(vital: Vitals):Observable<any>{
    return this.http.post(this.baseUrl,vital);
  }
}
