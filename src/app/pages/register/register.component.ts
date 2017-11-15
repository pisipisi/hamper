import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PhonePipe} from '../../_pipes/phonenumber.pipe';

import * as $ from 'jquery';
import { AlertService, UserService, AuthenticationService } from '../../_services/index';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  form:FormGroup;
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
    ngOnInit() {
        this.form = new FormGroup({
            password: new FormControl('', Validators.minLength(2)),
            passwordConfirm: new FormControl('', Validators.minLength(2)),
          }, passwordMatchValidator);
          
          function passwordMatchValidator(g: FormGroup) {
             return g.get('password').value === g.get('passwordConfirm').value
                ? null : {'mismatch': true};
          }
        
    }
    
    register() {
        this.loading = true;
        
        this.authenticationService.register(this.model).subscribe(
            data => {
                
                // set success message and pass true paramater to persist the message after redirecting to the login page
                this.alertService.success('Registration successful', true);
                this.authenticationService.login(this.model.email, this.model.password)
                    .subscribe( 
                        data => {
                            this.router.navigate(['/']);
                        },
                        error => {}

                    );
                    
                  
            },
            error => {
                console.log(error._body);
                if(error._body) {
                    this.alertService.error(error._body);
                } else {
                    this.alertService.error(error);
                }
                this.loading = false;
            });
       
        // this.userService.create(this.model).subscribe(
        //     data => {
        //         // set success message and pass true paramater to persist the message after redirecting to the login page
        //         this.alertService.success('Registration successful', true);
        //         this.router.navigate(['/login']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //         this.loading = false;
        //     });
  }

}
