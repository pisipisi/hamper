import { Component, OnInit, OnDestroy, EventEmitter, Output, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StripeCard, User } from '../../_models/index';
import { AlertService, AuthenticationService } from '../../_services/index';

import { Observable } from 'rxjs';

declare var Stripe:any;
@Component({
  selector: 'app-placeorder2',
  templateUrl: './placeorder2.component.html',
  styleUrls: ['./placeorder2.component.scss']
})
export class Placeorder2Component implements OnInit {
  @Input() amount;
  stripe: any;
  card: any;
  @Output() token = new EventEmitter<any>();
  order: any = {};
  orderNum:number;
  private sub: any;
  promoCode:string;
  addNew:boolean;
  loading:boolean = false;
  private stripcards:StripeCard[] = [];
  private currentUser: User;
  constructor(private route: ActivatedRoute,     
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderNum = +params['id']; // (+) converts string 'id' to a number
   });
   this.currentUser = JSON.parse(localStorage.getItem('user'));
   this.stripe = Stripe(this.authenticationService.stripeKey);
   var current = this;
   var elements = this.stripe.elements();
   this.getCardData();
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
  }
  checkPromo() {
    this.alertService.clear();
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.authenticationService.sendGetRequest("/api/promo/validate?customerID="+currentUser.customerID+"&code="+this.promoCode).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.alertService.error(error._body);
      }
    )
  }
  selectCardChange(value) {
    if (value === "0") {
      this.addNew = true;
    }
  }
  onSubmitOrder() {
    this.loading = true;
    if(this.addNew) {
      this.stripe.createToken(this.card).then(
        data => {
          this.stripeTokenHandler(data.token.id);
        },
        error => {
          // Inform the user if there was an error
          this.loading = false;
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = error.error.message;
        }
      ) 
    } else {
      this.submitOrder();
    }
  }

  stripeTokenHandler(token) {
    this.authenticationService.sendPostRequest("/api/payment/addstripesource?customerID="+this.currentUser.customerID+"&token="+token, {customerID:this.currentUser.customerID, token:token}).subscribe(
      success => {
        this.submitOrder();
      }, 
      error => {
        this.loading = false;
        this.alertService.error(error._body);
      }
    )
    
  }

  submitOrder() {
    
    // this.authenticationService.sendPostRequest("/api/order/new", this.order).subscribe(
    //   data => {

    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.router.navigate(['/receipt', this.orderNum]);
    this.loading = false;
  }
  getCardData() {
    this.authenticationService.sendGetRequest("/api/payment/fetchstripecustomer?customerID="+this.currentUser.customerID)
      .subscribe(
        data=> {
        //  this.stripcards = data.cards;
          if (data.cards) {
            // data.cards.forEach(card => {
            //   let c = new StripeCard();
            //   Object.assign(c, card);
            //   this.stripcards.push(c);
            //   this.addNew = false;
            // });
            this.router.navigate(['/receipt',this.orderNum]);
          } else {
            this.addNew = true;
          }
          
        },
        error=> {
          console.log(error);
        }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
