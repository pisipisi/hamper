export class StripeCard {
    isDefault:boolean;
    id:string;
    brand:string;
    number:string;
    last4:number;
    exp_month:number;
    exp_year:number;
    cvc:number;
    hamperStripeCard(isDefault:boolean)
    {
        this.isDefault = isDefault;
    }

    get getBrand():string
    {
        return this.brand;
    }

    get getDefaultAsString():string
    {
         return this.isDefault ? "(Default)" : "";
    }

    get getNumberAsString():string
    {
        if(this.getBrand == "PayPal")
        {
            return "PayPal";
        }

        let numberAsString:string = "";
        numberAsString += "Exp: " + this.getExpDateDisplayString;
        numberAsString += " Last 4: ••• " + this.last4.toString();
        numberAsString += " " + this.getDefaultAsString;
        return numberAsString;
    }

    get getExpDateDisplayString():string
    {
        return this.exp_month.toString() + "/" + this.exp_year.toString();
    }

    public getCvcDisplayString():string
    {
        return "•••";
    }

    public getAsSourceString():JSON
    {
        var card = JSON.stringify({
            object:'card', 
            number:this.number, 
            exp_month:this.exp_month, 
            exp_year:this.exp_year,
            cvc:this.cvc
        })

        return JSON.parse(card);
    }
}