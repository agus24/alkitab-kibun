import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as localforage from 'localforage';
import 'rxjs/add/operator/map';

export class User {
    username :string;
    email : string;

    constructor(username: string, email: string) {
      this.username = username;
      this.email = email;
    }
}
@Injectable()
export class AuthProvider {

    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
          return Observable.throw("Please insert credentials");
        } else {
          return Observable.create(observer => {
            let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
            let options = new RequestOptions({ headers: headers });

            this.http.post(`http://10.10.10.148/kibun-backend/public/api/login`, {
                  username: credentials.username,
                  password: credentials.password
                },options)
              .subscribe(data => {
                var result = JSON.parse(data['_body']);
                localStorage.setItem('name',result['name']);
                localStorage.setItem('email',result['email']);
                observer.next(data.ok);
                observer.complete();
               }, error => {
                observer.next(error.ok);
                observer.complete();
              });
          });
        }
      }
    getUserInfo(){
      return {
        "username" : localStorage.getItem('name'),
        "email" : localStorage.getItem('email')
      };
    }

    logout() {
      return Observable.create(observer => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        observer.next(true);
        observer.complete();
      });
    }
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }
}
