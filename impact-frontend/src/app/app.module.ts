import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import { UserService } from 'src/app/service/user/user-service';
import { ViewAllEmployeeComponent } from './modules/view-all-employee/view-all-employee.component';
import { ViewAllPatientsComponent } from './modules/view-all-patients/view-all-patients.component';




import { PatientDetailsComponent } from './modules/patient-details/patient-details.component'
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { LoginComponent } from './modules/login/login.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { InboxComponent } from './modules/inbox-module/inbox/inbox.component';
import { InboxModuleModule } from './modules/inbox-module/inbox-module.module';
import { TokenInterceptor } from './token.interceptor';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeRegistrationComponent,
    PatientRegistrationComponent,
    ViewAllEmployeeComponent,
    ViewAllPatientsComponent,
    PatientDetailsComponent,
    PatientDetailsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    




  
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
    Ng2TelInputModule,
    NgxIntlTelInputModule,
    InboxModuleModule,
    MatToolbarModule
  ],
  providers: [DatacreateService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
