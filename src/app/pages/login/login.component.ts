import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

    ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  login() {
      this.loading = true;
      let that = this;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe( 
              data => {
             //     this.getUserData(data.accessToken);
                  this.navigateUrl();
              },
              error => {
                  let message = JSON.parse(error._body);
                  this.alertService.error(message.error_description);
                  this.loading = false;
              });
  }
  getUserData(token) {
  //  localStorage.setItem('accessToken', token);
    this.authenticationService.sendPostRequest('/api/customer/login', {username:this.model.username, password:this.model.password}).subscribe(
      data => {
        localStorage.setItem('user',JSON.stringify(data));
        console.log(localStorage.getItem("accessToken"));
        
      },
      error => {}
    )
  }
  navigateUrl() {
    this.router.navigate([this.returnUrl]);
  }
}
