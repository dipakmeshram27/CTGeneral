import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {DatacreateService} from'src/app/service/datacreate.service';
import {FormsModule, ReactiveFormsModule} from'@angular/forms';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
 
@NgModule({
  declarations: 
  [
    AppComponent,
    EmployeeRegistrationComponent
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
    FormsModule
  ],
  providers: [DatacreateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
