export class CurrentOrder {
    customerID:number;
    orderID:number;
    statusID:number;
    status_str:string;
    pickup_date:string;
    dropoff_date:string;
    deliveryFee:number;
    tax:number;
    total:number;
    qty:number;
    subTotal:number;

    get pickupDateConverted():string {
        let date= new Date(this.pickup_date);
        return date.toUTCString()
    }
}