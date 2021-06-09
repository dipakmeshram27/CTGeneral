import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  
  sidebarOpened=true;
  constructor() { }

  ngOnInit(): void {
  }
  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
  }

}
