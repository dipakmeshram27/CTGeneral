import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component'
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component'
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from 'src/app/modules/scheduling/scheduling.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InboxDashboardComponent } from 'src/app/modules/inbox-dashboard/inbox-dashboard.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NotesComponent } from 'src/app/modules/notes/notes.component';
import { SendNoteComponent } from 'src/app/modules/send-note/send-note.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SentNoteComponent } from 'src/app/modules/sent-note/sent-note.component';
import { ReceiveNoteComponent } from 'src/app/modules/receive-note/receive-note.component';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    SchedulingComponent,
    InboxDashboardComponent,
    NotesComponent,
    SendNoteComponent,
    SentNoteComponent,
    ReceiveNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class DefaultModule { }
