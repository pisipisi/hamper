import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../../_services/index';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  message:string = "";
  loading:boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  submit() {
    let currentUse = JSON.parse(localStorage.getItem('user'));
    this.loading = true;
    this.authenticationService.sendPostRequest("/api/customer/contactus?customerID="+currentUse.customerID, this.message).subscribe(
      data => {
        this.alertService.success("Message sent!!!");
        this.message = "";
        this.loading = false;
      }
    )
  }
}
