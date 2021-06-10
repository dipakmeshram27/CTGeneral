import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { InboxDashboardComponent } from './modules/inbox-dashboard/inbox-dashboard.component';
import { SchedulingComponent } from './modules/scheduling/scheduling.component';
import { SendNoteComponent } from './modules/send-note/send-note.component';
import { SentNoteComponent } from './modules/sent-note/sent-note.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    { path: '', component: DashboardComponent },
    { path: 'schedule', component: SchedulingComponent },
    { path: 'inbox', component: InboxDashboardComponent },
    { path: 'send-notes', component: SendNoteComponent },
    { path: 'sent-notes', component: SentNoteComponent },
    { path: 'receive-notes', component: SendNoteComponent }
  ]
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
