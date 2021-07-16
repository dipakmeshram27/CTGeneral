import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from 'src/app/auth.guard';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { PatientProceduresComponent } from './patient-procedures/patient-procedures.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { MedicationsComponent } from './medications/medications.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';

const routes: Routes = [
    {
        path: '', 
        component: PatientVisitComponent,
        children: [
        { path: '', component: PatientVisitComponent },
        { path: 'diagnosis', component: DiagnosisComponent },
        { path: 'procedures', component: PatientProceduresComponent},
        { path: 'signs', component: VitalSignsComponent },
        { path: 'medications', component:MedicationsComponent},
        { path: 'patient-details', component:PatientDetailsComponent }
    ],
    canActivate: [AuthGuard],
    data:{
      expectedRole:['ROLE_PHYSICIAN', 'ROLE_NURSE', 'ROLE_PATIENT']
    }

    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientVisitRouting{

}