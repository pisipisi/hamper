import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './token-storage.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';

import { User } from '../_models/index';
interface AccessData {
    accessToken: string;
    refreshToken: string;
  }

@Injectable()
export class AuthenticationService {
    APIlink:string = 'http://localhost/api.php';
    basicUserName:string = "hampersoftware";
    basicPassword:string = "@2016Drycleaning";
    stripeKey:string = 'pk_test_XAYk6vKSbgYyyxqSwAkx4Qm4';
    constructor(private http: Http, private tokenStorage: TokenStorage) { }
    getNewAccessToken(username:string, password:string) {
        let body = {
            username: username, 
            password: password, 
            grant_type:'password', 
            login_type:'native'
        }
        let params = new URLSearchParams();
        for(let key in body){
            params.set(key, body[key]) 
        }
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.basicUserName+':'+this.basicPassword)); 
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept", "*/*");
        this.http.post(this.APIlink+'/accesstoken', {username:username, password:password}, {headers: headers})
        .map((response: Response) => {
            let accesstoken = response.json();
            if(!accesstoken.error) {
                console.log(accesstoken.access_token)
                localStorage.setItem('accessToken', accesstoken.access_token);
            }
            return accesstoken;
        })
    }

    login(username: string, password: string) {
        let body = {
            username: username, 
            password: password, 
            grant_type:'password', 
            login_type:'native'
        }
        let params = new URLSearchParams();
        for(let key in body){
            params.set(key, body[key]) 
        }
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.basicUserName+':'+this.basicPassword)); 
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept", "*/*");
        return this.http.post(this.APIlink+'/accesstoken', 'login_type=native&password='+password+'&grant_type=password&username='+username, {headers: headers})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let accesstoken = response.json();
             if (accesstoken && accesstoken.access_token) {
            //      store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('accessToken', accesstoken.access_token);
                 localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            //     let loginheaders: Headers = new Headers();
            //     loginheaders.append("Authorization", "Bearer " + accesstoken.access_token); 
            //     loginheaders.append("Content-Type", "application/json");
            //     loginheaders.append("Accept", "*/*");
            //     return this.http.post(this.APIlink+'login', {username:username, password:password}, {headers: loginheaders})
            //     .map((response: Response) => {
            //         let user = response.json();
            //         localStorage.setItem('userID', user.$id);
            //         localStorage.setItem('username', username);
            //         localStorage.setItem('password', password);
            //         return user;
            //     });
             } else {
            //     return accesstoken;
             }
            
            return accesstoken;
        });
    }
    register(user:User) {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.basicUserName+':'+this.basicPassword)); 
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "*/*");
        return this.http.put(this.APIlink+'/api/customer/signup', user, {headers: headers})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
             if (user.$id) {
                 localStorage.setItem('user', JSON.stringify(user));
             }
            
            return user;
        });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }

    sendPostRequest(request:string, body:any) {
        let headers = this.getHeader()
        return this.http.post(this.APIlink+request, body, {headers: headers})
        .map((response: Response) => {
            let result = response.json();
            return result;      
        });
    }
    sendGetRequest(request:string) {
        let headers = this.getHeader()
        return this.http.get(this.APIlink+request, {headers:headers})
        .map((response:Response) => {
            let result = response.json();
            return result;
        })
    }

    sendPutRequest(request:string, body:any) {
        let headers = this.getHeader()
        return this.http.put(this.APIlink+request, body, {headers:headers})
        .map((response:Response) => {
            let result = response.json();
            return result;
        })
    }
    sendDeleteRequest(request:string) {
        let headers = this.getHeader()
        return this.http.delete(this.APIlink+request, {headers:headers})
        .map((response:Response) => {
            let result = response.json();
            return result;
        })
    }

    getHeader():Headers {
        let token = localStorage.getItem('accessToken');
        let headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + token); 
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "*/*");
        return headers;
    }

    public refreshShouldHappen(response: Response): boolean {
        return response.status === 401
    }

    public getAccessToken(): Observable < string > {
        return this.tokenStorage.getAccessToken();
    }
      
      /**
     * Save access data in the storage
     *
     * @private
     * @param {AccessData} data
     */
    private saveAccessData({ accessToken, refreshToken }: AccessData) {
        this.tokenStorage
        .setAccessToken(accessToken)
        .setRefreshToken(refreshToken);
    }
}