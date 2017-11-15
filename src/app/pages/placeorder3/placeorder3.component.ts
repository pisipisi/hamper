import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../_services/index';

@Component({
  selector: 'app-placeorder3',
  templateUrl: './placeorder3.component.html',
  styleUrls: ['./placeorder3.component.scss']
})
export class Placeorder3Component implements OnInit {
  orderNum:number;
  private sub: any;
  order:any = {};
  constructor(
    private route: ActivatedRoute,     
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderNum = +params['id']; // (+) converts string 'id' to a number
   });
   this.authenticationService.sendGetRequest("/api/order/details?orderID="+this.orderNum).subscribe(
     data => {
       console.log(data);
       this.order = data;
     }
   )
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
