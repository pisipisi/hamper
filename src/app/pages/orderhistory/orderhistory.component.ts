import { Component, OnInit } from '@angular/core';
import { User, CurrentOrder } from '../../_models/index';
import { UserService, AlertService, AuthenticationService, ModalService } from '../../_services/index';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent implements OnInit {
  currentUser: User;
  history:CurrentOrder[]= [];
  constructor(private userService: UserService, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.authenticationService.sendGetRequest("/api/customer/orders?customerID="+this.currentUser.customerID+"&orderType=history").subscribe(
      data => {
        data.forEach(order => {
          let o = new CurrentOrder()
          Object.assign(o, order);
          this.history.push(o);
        })
    })
  }
  rowClick() {
    console.log("dfgdf");
  }

}
