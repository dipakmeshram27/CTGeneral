import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NotesService } from '../../service/notes/notes.service';

@Component({
  selector: 'app-sent-note',
  templateUrl: './sent-note.component.html',
  styleUrls: ['./sent-note.component.css']
})
export class SentNoteComponent implements OnInit {

  public sendNote = [];
  constructor(private noteService: NotesService) { }

  form = new FormGroup({
  })

  ngOnInit(): void {
    // TODO: Sender id is hardcoded - needs to be updated after login
    this.noteService.getSentNotes(23).subscribe(val => {
      console.log(val);
      this.sendNote = val;
    })
  }
  sentNotes() {
  }
}
