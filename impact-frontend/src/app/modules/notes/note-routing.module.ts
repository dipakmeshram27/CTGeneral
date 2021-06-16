import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { NotesComponent } from './notes.component';
import { SendNoteComponent } from './send-note/send-note.component';

const routes: Routes = [
    {
        path: '',
        component: NotesComponent,
        children: [
            { path: '', component: SendNoteComponent }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteRoutingModule { }