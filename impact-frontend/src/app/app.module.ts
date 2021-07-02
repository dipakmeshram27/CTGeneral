import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component'
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";

@NgModule({
  declarations: [
    AppComponent,
    PatientRegistrationComponent,
    PatientDetailsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SharedModule,
    HttpClientModule,
    NgbToastModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    NgxIntlTelInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
