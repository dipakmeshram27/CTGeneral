import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientVisitComponent } from '../patient/patient-visit/patient-visit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { PatientProceduresComponent } from './patient-procedures/patient-procedures.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { MedicationsComponent } from './medications/medications.component';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';

import { DiagnosisDailogComponent } from './Dialog/diagnosis-dailog/diagnosis-dailog.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';


const routes: Routes = [
    {
        path: 'visit', component: PatientVisitComponent,
        children: [{
            path: 'diagnosis', component: DiagnosisComponent
        },{
            path: 'procedures', component: PatientProceduresComponent
        },{
            path: 'signs', component: VitalSignsComponent
        },{
            path: 'medications', component:MedicationsComponent
        },{ path: 'patient-details', component:PatientDetailsComponent}
    ]

    }
];

@NgModule({


    declarations: [
        PatientVisitComponent,
        DiagnosisComponent,
        PatientProceduresComponent,
        VitalSignsComponent,
        MedicationsComponent,
        DiagnosisDailogComponent
    ],

    imports: [RouterModule.forRoot(routes),
        SharedModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatDividerModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        
        MatAutocompleteModule,
        BrowserAnimationsModule,
        BrowserModule

    ],
    exports: [RouterModule],
    
})


export class PatientVisitModule { }