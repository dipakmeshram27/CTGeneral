import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin Dashboard';

  sidebarOpened=true;
  constructor(private currentRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.currentRoute);
    this.currentRoute.url.subscribe(url => {
      console.log(url)
    })
  }
  sidebarToggler(){
    this.sidebarOpened=!this.sidebarOpened;
  }
}
