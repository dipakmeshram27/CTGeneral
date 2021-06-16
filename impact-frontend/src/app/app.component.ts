import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Dashboard';

  sidebarOpened=true;
  constructor() { }

  ngOnInit(): void {
  }
  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
  }
}
