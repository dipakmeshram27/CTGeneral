import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component'
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component'
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from 'src/app/modules/scheduling/scheduling.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmployeeRegistrationComponent } from 'src/app/modules/employee-registration/employee-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: 
  [
    DefaultComponent,
    DashboardComponent,
    SchedulingComponent,
    EmployeeRegistrationComponent
  ],
  imports: 
  [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
