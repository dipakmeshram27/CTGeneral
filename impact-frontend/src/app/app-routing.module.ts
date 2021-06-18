import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PatientDetailsComponent } from './modules/patient-details/patient-details.component';
import { PatientRegistrationComponent } from './modules/patient-registration/patient-registration.component';
import { SchedulingComponent } from './modules/scheduling/scheduling.component';


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
  {
    path: 'note',
    loadChildren: () => import('./modules/notes/notes.module').then(m => m.NoteModule),
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
