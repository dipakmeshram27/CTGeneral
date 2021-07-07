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
import { UserService } from 'src/app/service/user/user-service';
import { ViewAllEmployeeComponent } from './modules/view-all-employee/view-all-employee.component';
import { ViewAllPatientsComponent } from './modules/view-all-patients/view-all-patients.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeRegistrationComponent,
    PatientRegistrationComponent,
    ViewAllEmployeeComponent,
    ViewAllPatientsComponent
  
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
    ReactiveFormsModule
  ],
 
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
