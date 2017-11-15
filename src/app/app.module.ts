import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
 
import { AppComponent }  from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { routing }        from './app.routing';
 
import { AlertComponent, SidebarComponent, ModalComponent } from './_directives/index';

import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, TokenStorage, ModalService } from './_services/index';


import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { Placeorder2Component } from './pages/placeorder2/placeorder2.component';
import { Placeorder3Component } from './pages/placeorder3/placeorder3.component';
import { OrderhistoryComponent } from './pages/orderhistory/orderhistory.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    SidebarComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    PlaceorderComponent,
    MyprofileComponent,
    PaymentsComponent,
    ContactusComponent,
    Placeorder2Component,
    Placeorder3Component,
    OrderhistoryComponent,
    OrderdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    routing,
    DateTimePickerModule
  ],
  providers: [AuthGuard,
    AlertService,
    AuthenticationService,
    ModalService,
    UserService,
    TokenStorage,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
