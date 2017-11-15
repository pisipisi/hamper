import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../_services/index';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit {
  orderNum:number;
  private sub: any;
  detail:any = {};
  constructor(private route: ActivatedRoute,     
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderNum = +params['id']; // (+) converts string 'id' to a number
   });
   this.authenticationService.sendGetRequest("/api/order/details?orderID="+this.orderNum).subscribe(
     date => {
       this.detail = date;
     }
   )
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
