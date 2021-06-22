import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/login/login.component';
import { SchedulingComponent } from './modules/scheduling/scheduling.component';
import {InboxModuleModule} from './modules/inbox-module/inbox-module.module'


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
  {
    path: 'note',
    loadChildren: () => import('./modules/notes/notes.module').then(m => m.NoteModule),
  },
  {
    path: 'inbox',
    loadChildren: () => import('./modules/inbox-module/inbox-module.module').then(m => m.InboxModuleModule),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
