import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../../_services/index';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  currentUser:any; 
  loading:boolean = false;
  addressLoading:boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { 

    }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authenticationService.sendPostRequest("/api/customer/addresses", this.currentUser ).subscribe(
      data => {
        this.currentUser.street_address_1 = data.street_address_1;
        this.currentUser.suite_1 = data.suite_1;
        this.currentUser.zip_1 = data.zip_1;        
      },
      error => {}
    )
  }
  updateProfile() {
    this.loading = true;
    this.alertService.clear()
    this.authenticationService.sendPutRequest("/api/customer/update", this.currentUser).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.loading = false;
        this.alertService.success("Update successed");
      },
      error => {
        this.loading = false;
        this.alertService.error("Error");
      }
    )
  }
  updateAddress() {
    this.alertService.clear()
    this.addressLoading = true;
    this.authenticationService.sendPutRequest("/api/customer/update", this.currentUser).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.addressLoading = false;
        this.alertService.success("Update successed");
      },
      error => {
        this.addressLoading = false;
        this.alertService.error(error);
      }
    )
  }

}
