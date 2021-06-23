import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {

  sidebarOpened=true;
  isExpanded = true;
  isShowing = false;

  constructor() { }

  ngOnInit(): void {
  }

  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
