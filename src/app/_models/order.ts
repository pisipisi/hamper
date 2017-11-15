export class Order {
    public orderID:number;
    public customerID:number;
    public dropoff_boxID:string;
    public pickup_boxID:string;
    public dropoff_date:string;
    public pickup_date:string;
    public rfID:number;
    public statusID:number;
    public instructions:string;
    public hasPaid:boolean;
    public isDelivery:boolean;
    public deliverToHomeAddress:boolean;
    public didSkip:boolean;
    public confirmation:string;
    public addressIndex:number;
    public deliveryFee:number;
    public hasWashNFold:boolean;
    public paymentMethod:string;
}