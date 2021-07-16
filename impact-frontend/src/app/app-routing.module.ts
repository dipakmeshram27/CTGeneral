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
import { ViewAllEmployeeComponent } from 'src/app/modules/view-all-employee/view-all-employee.component';
import { ViewAllPatientsComponent } from './modules/view-all-patients/view-all-patients.component';
import {InboxModuleModule} from './modules/inbox-module/inbox-module.module'
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
    
  },
  {
    path: 'app-dashboard',            
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data:{
      expectedRole:['ROLE_PHYSICIAN', 'ROLE_NURSE','ROLE_ADMIN', 'ROLE_PATIENT']
    }
  },
  {
    path: 'patient-registration',
    component: PatientRegistrationComponent
  },
  { path: 'patient-details', 
  component: PatientDetailsComponent,
  canActivate: [AuthGuard],
  data:{
    expectedRole:['ROLE_PHYSICIAN', 'ROLE_NURSE', 'ROLE_PATIENT']
  }
},
  
  { path: 'schedule', 
  component: SchedulingComponent,
  canActivate: [AuthGuard],
  data:{
    expectedRole:['ROLE_PHYSICIAN', 'ROLE_NURSE', 'ROLE_PATIENT']
  } 
},


  { path: 'employee-registration' , 
  component:EmployeeRegistrationComponent,
  canActivate: [AuthGuard],
  data:{
    expectedRole:['ROLE_ADMIN']
  }
},
{ path: 'view-employee' , component:ViewAllEmployeeComponent ,canActivate: [AuthGuard],
data:{
  expectedRole:['ROLE_ADMIN']
}},
  { path: 'view-patient' , component:ViewAllPatientsComponent,
  canActivate: [AuthGuard],
  data:{
    expectedRole:['ROLE_ADMIN']
  }},
  {
    path: 'note',
    loadChildren: () => import('./modules/notes/notes.module').then(m => m.NoteModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: 'inbox',
    loadChildren: () => import('./modules/inbox-module/inbox-module.module').then(m => m.InboxModuleModule),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }

 // { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
