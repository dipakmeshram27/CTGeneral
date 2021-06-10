import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/service/notes/notes.service';

@Component({
  selector: 'app-receive-note',
  templateUrl: './receive-note.component.html',
  styleUrls: ['./receive-note.component.css']
})
export class ReceiveNoteComponent implements OnInit {
  receiveNote=[];
  selectedNoteId;
  constructor(private noteService: NotesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // TODO: Sender id is hardcoded - needs to be updated after login
    this.noteService.getRecieveNotes(14).subscribe(val=>{
      console.log(val);
      this.receiveNote = val;
    })
  }

  open(content, selectedNoteId) {
  
  this.selectedNoteId=selectedNoteId;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

}
