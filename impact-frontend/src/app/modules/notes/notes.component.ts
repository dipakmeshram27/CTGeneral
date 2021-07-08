import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private router: Router,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
