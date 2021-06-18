import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import { DatacreateService } from 'src/app/service/datacreate.service';

import { PatientDetailsComponent } from './modules/patient-details/patient-details.component'
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeRegistrationComponent,
    PatientRegistrationComponent,
    PatientDetailsComponent

  
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbToastModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  providers: [DatacreateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
