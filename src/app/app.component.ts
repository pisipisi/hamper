import { Component } from '@angular/core';
import { AuthGuard } from './_guards/index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login:boolean;
  constructor(public authGuard: AuthGuard) {}
  ngOnInit() {
    if (localStorage.getItem('accessToken')) {
      this.login = false;
    } else {
      this.login = true;
    }
  }
}
