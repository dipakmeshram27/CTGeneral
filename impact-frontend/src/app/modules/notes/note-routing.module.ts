import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { NotesComponent } from './notes.component';
import { ReceiveNoteComponent } from './receive-note/receive-note.component';
import { SentNoteComponent } from './sent-note/sent-note.component';

const routes: Routes = [
    {
        path: '',
        component: NotesComponent,
        children: [
            { path: '', component: NotesComponent },
            { path: 'received-notes', component: ReceiveNoteComponent },
            { path: 'sent-notes', component: SentNoteComponent }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteRoutingModule { }