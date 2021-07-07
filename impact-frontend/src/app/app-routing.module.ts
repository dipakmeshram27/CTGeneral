import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { SchedulingComponent } from './modules/scheduling/scheduling.component';
import { ViewAllEmployeeComponent } from 'src/app/modules/view-all-employee/view-all-employee.component';
import { ViewAllPatientsComponent } from './modules/view-all-patients/view-all-patients.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'patient-registration',
    component: PatientRegistrationComponent
  },
  { path: 'patient-details', component: PatientDetailsComponent},
  
  { path: 'schedule', component: SchedulingComponent },
  { path: 'employee-registration' , component:EmployeeRegistrationComponent},
  { path: 'view-employee' , component:ViewAllEmployeeComponent},
  { path: 'view-patient' , component:ViewAllPatientsComponent},
  {
    path: 'note',
    loadChildren: () => import('./modules/notes/notes.module').then(m => m.NoteModule),
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
