import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appointment} from '../../model/appointment';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class AppointmentService {
    constructor(private http:HttpClient) { }
  
   
    getAppointmentToPhysician(physicianId: number, startDate: string, endDate: string):Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${environment.baseUrl}/appointment/getAppointmentToPhysician?physicianId=${physicianId}&startDate=${startDate}&endDate=${endDate}`, );
      }

      getAppointmentToPatient(patientId: number, startDate: string, endDate: string):Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${environment.baseUrl}/appointment/getAppointmentToPatient?physicianId=${patientId}&startDate=${startDate}&endDate=${endDate}`, );
      }
   
  }
  