import { NgModule } from '@angular/core';
import { NotesComponent } from './notes.component';
import { SendNoteComponent } from './send-note/send-note.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceiveNoteComponent } from './receive-note/receive-note.component';

@NgModule({
  declarations: [
    NotesComponent,
    SendNoteComponent,
    ReceiveNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NoteRoutingModule,
    SharedModule,
    NgbToastModule
  ],
  providers: [],
  bootstrap: [NotesComponent],
  exports:[SendNoteComponent,ReceiveNoteComponent]
})
export class NoteModule { }
