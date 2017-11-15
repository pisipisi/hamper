import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, ModalService } from '../../_services/index';
import { StripeCard, User } from '../../_models/index';
import * as $ from 'jquery';

declare var Stripe:any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  private stripcards:StripeCard[] = [];
  addNew:boolean = false;
  currentUser:any;
  stripe: any;
  card: any;
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.loadCards();
  }
  loadCards() {
    this.authenticationService.sendGetRequest("/api/payment/fetchstripecustomer?customerID="+this.currentUser.customerID)
    .subscribe(
      data=> {
      //  this.stripcards = data.cards;
      if ( data.cards) {
        data.cards.forEach(card => {
          let c = new StripeCard();
          Object.assign(c, card);
          this.stripcards.push(c);
          this.addNew = false;
        });
      } else {
        this.addNew = true;
      }
        
      },
      error=> {
        console.log(error);
      }
    )
  }
  addNewCard() {
    this.stripe = Stripe(this.authenticationService.stripeKey);
    var elements = this.stripe.elements();
    this.card = elements.create('card', {
            style: {
                base: {
                    iconColor: '#666EE8',
                    color: '#31325F',
                    lineHeight: '30px',
                    fontWeight: 300,
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '15px',
    
                    '::placeholder': {
                        color: '#CFD7E0',
                    },
                },
            }
        });
    this.card.mount('#card-element');
    this.modalService.open("addcard");
  }
  deleteCard(id:string) {
    this.authenticationService.sendDeleteRequest("/api/payment/deletestripesource?customerID="+this.currentUser.customerID+"&cardID="+id)
    .subscribe(
      data=> {
        this.stripcards = [];
        this.loadCards();
      },
      error=> {}
    )
  }
  addNewCardSubmit() {
    this.stripe.createToken(this.card).then(
      data => {
        this.stripeTokenHandler(data.token.id);

      },
      error => {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.error.message;
      }
    ) 
  }
  stripeTokenHandler(token) {
    this.authenticationService.sendPostRequest("/api/payment/addstripesource?customerID="+this.currentUser.customerID+"&token="+token, {customerID:this.currentUser.customerID, token:token}).subscribe(
      success => {
        this.stripcards = [];
        this.loadCards();
      }, 
      error => {
        this.alertService.error(error._body);
      }
    )
    
  }
}
