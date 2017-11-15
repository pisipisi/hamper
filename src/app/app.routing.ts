import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { OrderhistoryComponent } from './pages/orderhistory/orderhistory.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
import { Placeorder2Component } from './pages/placeorder2/placeorder2.component';
import { Placeorder3Component } from './pages/placeorder3/placeorder3.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AuthGuard } from './_guards/index';
const appRoutes: Routes = [
   { 
       path: '', 
       component: HomeComponent, 
       canActivate: [AuthGuard] 
    },
    { 
        path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard] 
    },
    { 
        path: 'history', 
        component: OrderhistoryComponent, 
        canActivate: [AuthGuard] 
    },
    { 
        path: 'history/:id', 
        component: OrderdetailComponent, 
        canActivate: [AuthGuard] 
    },
   { 
       path: 'login', 
       component: LoginComponent 
    },
   { 
       path: 'register', 
       component: RegisterComponent 
    },
    {
        path: 'placeorder',
        component: PlaceorderComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'placeorder2/:id',
        component: Placeorder2Component,
        canActivate: [AuthGuard]
    },
    {
        path: 'receipt/:id',
        component: Placeorder3Component,
        canActivate: [AuthGuard]
    },
    {
        path: 'myprofile',
        component: MyprofileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contactus',
        component: ContactusComponent,
        canActivate: [AuthGuard]
    },
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);