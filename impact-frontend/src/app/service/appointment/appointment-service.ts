import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../model/appointment';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }


  bookAppointment(newAppointment: Appointment): Observable<any> {
    return this.http.post(`${environment.baseUrl}/scheduler-service/appointment/save`, newAppointment);
  }


  getAppointmentToPhysician(physicianId: number, startDate: string, endDate: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.baseUrl}/scheduler-service/appointment/getAppointmentToPhysician?physicianId=${physicianId}&startDate=${startDate}&endDate=${endDate}`,);
  }

  getAppointmentToPatient(patientId: number, startDate: string, endDate: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.baseUrl}/scheduler-service/appointment/getAppointmentToPatient?patientId=${patientId}&startDate=${startDate}&endDate=${endDate}`,);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${environment.baseUrl}/scheduler-service/appointment/getAppointmentById?id=${id}`,);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    return this.http.put<Appointment>(`${environment.baseUrl}/scheduler-service/appointment/modify/${appointment.appointmentId}`,appointment);
  }

}
