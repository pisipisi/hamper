import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    getUser() {
        const token: User = <User>JSON.parse(localStorage.getItem('user'));
        return Observable.of(token);
    }
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + accessToken });
            return new RequestOptions({ headers: headers });
        }
    }
}