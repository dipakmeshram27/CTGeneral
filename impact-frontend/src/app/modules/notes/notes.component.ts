import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast/toast.service';
import { FormGroup, FormControl, FormArray, Validators,FormBuilder } from '@angular/forms';
import { NotesService } from 'src/app/service/notes/notes.service';
import { Notes } from 'src/app/model/notes';
import { LoginService } from 'src/app/service/login/login-service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  form: FormGroup;
  public users = [];
  public note;
  designation;
  submitted = false
  constructor(private router: Router,
    private modalService: NgbModal,private noteService: NotesService,private formBuilder: FormBuilder,
    private toastService: ToastService,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      recieverId: new FormControl('', [Validators.required]),
      message: new FormControl('',[Validators.required,Validators.maxLength(200)]),
      designation: new FormControl(),
      urgency: new FormControl('',[Validators.required])
    })
    this.designation = this.form.value.designation;
    this.noteService.getUsersByRole(this.loginService.userRole).subscribe(val => {
      this.users = val.filter(user => {
        // TODO: sender id is hardcoded for now . would be fetched from session
        return user.userId !== parseInt(localStorage.getItem("id"));
      });
      console.log(val);
      
    })
  }

  sendNotes() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    let newNotes: Notes = this.form.value;
    // TODO: sender id is hardcoded for now . would be fetched from session
    newNotes.senderId = parseInt(localStorage.getItem("id"));
    this.noteService.sendNotes(newNotes).subscribe(
      data => {
        this.toastService.show(data.message, { classname: 'bg-success text-light', delay: 5000 })
        if (this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
          this.form.reset();
        }
      },
      error => {
        this.toastService.show('Server Error please try later', { classname: 'bg-danger text-light', delay: 5000 });
        if (this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
          this.form.reset();
        }
      })
  }

  populateDesgination() {
    this.form.get('designation').setValue(
      this.users.find(u => u.userId === this.form.get('recieverId').value).role.role);
  }

  get f() { return this.form.controls; }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
