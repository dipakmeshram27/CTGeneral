import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { environment } from '../../../environments/environment';
import { patientdetails } from 'src/app/model/patientdetails';

@Injectable({
    providedIn: 'root'
  })
  export class PatientdetailsService {
    constructor(private http:HttpClient) { }
  
  
    patientdetails(_patientDetails: patientdetails):Observable<any>{
      return this.http.post(`${environment.baseUrl}/patient/savePatient`, _patientDetails);
    }

    getAllergy():Observable<any>{
      return this.http.get(`${environment.baseUrl}/patient/allergy`);
    }

    getAllergyById(allergyid: number):Observable<any>{

        return this.http.get(`${environment.baseUrl}/patient/allergy/`+allergyid );
    }
  }