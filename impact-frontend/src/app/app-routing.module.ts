import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { SchedulingComponent } from './modules/scheduling/scheduling.component';

const routes: Routes = 
[
  { path: '', component: DefaultComponent,
    children: 
    [
      { path: '', component: DashboardComponent },
      { path: 'schedule', component: SchedulingComponent },
      { path: 'employee-registration' , component:EmployeeRegistrationComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
