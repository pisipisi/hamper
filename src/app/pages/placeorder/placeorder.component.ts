import { Component, OnInit } from '@angular/core';
import { StripeCard, User } from '../../_models/index';
import { AlertService, AuthenticationService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';


@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})
export class PlaceorderComponent implements OnInit {

  order: any = {};

  promoCode:string;
  private pickup_min:Date;
  private delivery_min:Date;
  private pickup:any;
  private delivery:any;
  private currentUser: User;
  private stripcards:StripeCard[] = [];

  pickupMorningBtn:boolean = true;
  pickupAfternoonBtn:boolean = true;
  pickupEveningBtn:boolean = true;

  deliveryMorningBtn:boolean = true;
  deliveryAfternoonBtn:boolean = true;
  deliveryEveningBtn:boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    let today = new Date(Date.now());
    this.pickup_min = new Date(today);
    this.delivery_min = new Date(today);
    if(today.getHours()>18) {
      this.pickup_min.setDate(today.getDate()+1);
    }
  }

  
  loadUserData() {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    this.authenticationService.sendPostRequest('/api/customer/login', {username:username, password:password}).subscribe(
      data => {
        localStorage.setItem('user',JSON.stringify(data));
        this.loadUserAddresses();
        
      },
      error => {}
    )
  }
  loadUserAddresses() {
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
  ngOnInit() {
    this.loadUserData();
  }
  
  onSubmitOrder() {
    if(this.promoCode) {
      this.checkPromo();
    } else {
      this.checkDeliveryFee()
    //  this.submitOrder();
    }
  }

  submitOrder() {
    if(this.pickup && this.delivery) {
      this.order.pickup_date = this.convertTime(this.pickup);
      this.order.dropoff_date = this.convertTime(this.delivery);
      this.order.customerID = this.currentUser.customerID;
      this.order.didSkip = true;
      this.order.addressIndex = 1;
      this.order.deliverToHomeAddress = false;
      this.authenticationService.sendPostRequest("/api/order/new", this.order).subscribe(
        data => {
          this.order.orderID = data;
          let id = data;
          this.router.navigate(['/placeorder2', id]);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  
  private convertTime(date:Date):string {
    let day = date.getDate();       // yields date
    let month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    let year = date.getFullYear();  // yields year
    let hour = date.getHours();     // yields hours 
    let minute = date.getMinutes(); // yields minutes
    let second = date.getSeconds(); // yields seconds
    
    // After this construct a string with the above results as below
    return month + "/" + day + "/" + year + " " + hour + ':' + minute + ':' + second; 
  }
  onButtonDeliveryClick($event){
    if (this.delivery && this.pickup) {
      this.onButtonClick($event);
      
      switch ($event.target.innerText) {
        case "Morning": 
        this.delivery.setHours(10);
        this.delivery.setMinutes(0);
        break;
        case "Afternoon":
        this.delivery.setHours(14);
        this.delivery.setMinutes(0);
        break;
        case "Evening":
        this.delivery.setHours(18);
        this.delivery.setMinutes(0);
        break;
      }
    } else {
      this.alertService.error("Please select delivery date first");
    }
  }
  onButtonPickupClick($event){
    if(this.pickup) {
      this.onButtonClick($event);
      this.alertService.clear();
      switch ($event.target.innerText) {
        case "Morning": 
        this.pickup.setHours(10);
        this.pickup.setMinutes(0);
        this.delivery_min.setDate(this.pickup.getDate()+2);


  //      this.delivery_min.setHours(this.pickup.getHours() + 4);
        break;
        case "Afternoon":
        this.pickup.setHours(14);
        this.pickup.setMinutes(0);
        this.delivery_min.setDate(this.pickup.getDate()+2);
   //     this.delivery_min.setHours(this.pickup.getHours() + 4);
        ;
        break;
        case "Evening":
        this.pickup.setHours(18);
        this.pickup.setMinutes(0);
        this.delivery_min.setDate(this.pickup.getDate()+3);
        break;
      }
    } else {
      this.alertService.error("Please select pickup date first");
    }
  }

  private onButtonClick($event) {
    let clickedElement = $event.target || $event.srcElement;
    if( clickedElement.nodeName === "BUTTON" ) {
  
      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".btn-primary");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("btn-primary");
      }
      clickedElement.className += " btn-primary";
    }
  }
  onSelectPickupDate($event) {
    let today = new Date(Date.now());
    if(this.delivery) {
      if(this.pickup.getDate() > this.delivery.getDate()) {
        this.delivery.setDate(this.pickup.getDate()+2);
      } 
      this.delivery_min.setDate(this.pickup.getDate()+2);
      this.updateDeliveryTimeBtn(this.delivery);
    }
    if(today.getDate() === $event.value.getDate()) {
      if($event.value.getHours() > 10) {
        this.pickupMorningBtn = false;
      }
      if($event.value.getHours() > 14) {
        this.pickupAfternoonBtn = false;
      }
    } else {
      this.pickupMorningBtn = true;
      this.pickupAfternoonBtn = true;
    }
  }

  onSelectDeliveryDate($event) {
    
    if(this.pickup && (this.pickup.getHours()===10 || 14 || 18)) {
      this.updateDeliveryTimeBtn($event.value);
    } else {
      console.log(this.pickup);
      this.alertService.error("Please select pickup date and time first");
    }
    
  }
  updateDeliveryTimeBtn(date:Date) {
    if(date.getDate()===this.pickup.getDate()+2) {
      if(this.pickup.getHours() > 9) {
        this.deliveryMorningBtn = false;
      }
      if(this.pickup.getHours() > 13) {
        this.deliveryAfternoonBtn = false;
      }
      if (this.pickup.getHours() > 17) {
        this.deliveryEveningBtn = false;
      }
    } else {
      this.deliveryMorningBtn = true;
      this.deliveryAfternoonBtn = true;
      this.deliveryEveningBtn = true;
    }
  }
  disableButton(n:number) {
    switch (n) {
      case 1: 
      return !this.pickupMorningBtn;
      case 2: 
      return !this.pickupAfternoonBtn;
      case 3: 
      return !this.pickupEveningBtn;
      case 4: 
      return !this.deliveryMorningBtn;
      case 5: 
      return !this.deliveryAfternoonBtn;
      case 6: 
      return !this.deliveryEveningBtn;
    }
  }
  checkPromo() {
    this.authenticationService.sendGetRequest("/api/promo/validate?customerID="+this.currentUser.customerID+"&code="+this.promoCode).subscribe(
      data => {
        this.order.UsedPromo = data;
       // this.submitOrder() ;
        this.checkDeliveryFee()
      },
      error => {
        this.alertService.error(error._body);
      }
    )
  }

  checkDeliveryFee() {
    this.authenticationService.sendGetRequest("/api/metadata/deliveryinfo?zipCode="+this.currentUser.zip_1).subscribe(
      data => {
        this.order.deliveryFee = data.DeliveryFee;
        this.submitOrder() 
      },
      error => {
        this.alertService.error(error._body);
      }
    )
  }

}
