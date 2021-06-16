import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/service/notes/notes.service';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Notes } from 'src/app/model/notes';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-receive-note',
  templateUrl: './receive-note.component.html',
  styleUrls: ['./receive-note.component.css']
})
export class ReceiveNoteComponent implements OnInit {
  replyForm: FormGroup;
  receiveNote = [];
  selectedNoteId;

  submitted = false;
  constructor(private noteService: NotesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      reply: new FormControl('', [Validators.required, Validators.maxLength(200)])
    })

    this.getReciveNote();
   
  }

  getReciveNote(){
      // TODO: Sender id is hardcoded - needs to be updated after login
    this.noteService.getRecieveNotes(14).subscribe(val => {
      console.log(val);
      this.receiveNote = val;
    })
  }


  open(content, selectedNoteId) {
    this.selectedNoteId = selectedNoteId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  delete(selectedNoteId) {
   this.noteService.deleteNoteById(selectedNoteId).subscribe(
     data => {
      console.log(data);
      this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 5000 })
      this.getReciveNote();
     },
     error => {
      this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
  
     }
     
     )
    
  }

  sendNotes() {
    this.submitted = true;
    if(this.replyForm.invalid)
      return;

    this.noteService.reply(this.f.reply.value, this.selectedNoteId).subscribe(
      data => {
        console.log(data);
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 5000 })
        if (this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
          this.replyForm.reset();
        }
      },
      error => {
        this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
        if (this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
          this.replyForm.reset();
        }
      }
    );
  }

  get f() {
    return this.replyForm.controls;
  }
}
