import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators,FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { NotesService } from '../../../service/notes/notes.service';
import { Notes } from '../../../model/notes';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-send-note',
  templateUrl: './send-note.component.html',
  styleUrls: ['./send-note.component.css']
})
export class SendNoteComponent implements OnInit {
  form: FormGroup;
  public users = [];
  public note;
  designation;
  submitted = false
  constructor(private noteService: NotesService,private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      recieverId: new FormControl('', [Validators.required]),
      message: new FormControl('',[Validators.required,Validators.maxLength(200)]),
      designation: new FormControl(),
      urgency: new FormControl('',[Validators.required])
    })
    this.designation = this.form.value.designation;
    this.noteService.getUsersByRole().subscribe(val => {
      this.users = val.filter(user => {
        // TODO: sender id is hardcoded for now . would be fetched from session
        return user.userId !== 23;
      });
      console.log(val);
      
    })
  }
  match(){
    let senderId = 23
    let recieverId = this.form.value
    if(senderId != recieverId)
    return true;
  }
  sendNotes() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    let newNotes: Notes = this.form.value;
    // TODO: sender id is hardcoded for now . would be fetched from session
    newNotes.senderId = 23;
    this.noteService.sendNotes(newNotes).subscribe(
      data => {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 5000 })
      },
      error => {
        this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
      })
  }

  populateDesgination() {
    this.form.get('designation').setValue(
      this.users.find(u => u.userId === this.form.get('recieverId').value).role.role);
  }

  get f() { return this.form.controls; }
}
