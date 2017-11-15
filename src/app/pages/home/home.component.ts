import { Component, OnInit } from '@angular/core';
import { User, CurrentOrder } from '../../_models/index';
import { UserService, AlertService, AuthenticationService, ModalService } from '../../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:User;
  customerID:number;
  users: User[] = [];
  currentOrder:CurrentOrder[] = [];
  loading = true;
  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
      
  }

  ngOnInit() {
    this.loadUserData()
  }

  loadUserData() {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    this.authenticationService.sendPostRequest('/api/customer/login', {username:username, password:password}).subscribe(
      data => {
        console.log(data.customerID);
        localStorage.setItem('customerID',JSON.stringify(data.customerID));
        this.loadOrders();   
      },
        error => {}
    )
  }  
  loadOrders() {
    this.customerID = JSON.parse(localStorage.getItem('customerID'));
    this.authenticationService.sendGetRequest("/api/customer/orders?customerID="+this.customerID+"&orderType=current").subscribe(
        data => {
          data.forEach(order => {
            let o = new CurrentOrder()
            Object.assign(o, order);
            this.currentOrder.push(o);
          })
          this.loading = false;
        },
        error => this.loading = false)
    
  }
}

