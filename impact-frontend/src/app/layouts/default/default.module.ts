import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component'
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component'
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from 'src/app/modules/scheduling/scheduling.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    SchedulingComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class DefaultModule { }
