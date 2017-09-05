import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as firebase from "firebase";
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
url : "http://ctw-soft.com/alkitab/public/";
    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
          return Observable.throw("Please insert credentials");
        } else {
          return Observable.create(observer => {
            let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
            let options = new RequestOptions({ headers: headers });

            this.http.post(`http://ctw-soft.com/alkitab/public/api/login`, {
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


  loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.setCustomParameters({
      'display': 'popup'
    });
  }
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
    var config = {
        apiKey: "AIzaSyB63-KAHHizMrHIyyDeGW1l6kWJFzKtZkw",
        authDomain: "alkitabkibun.firebaseapp.com",
        databaseURL: "https://alkitabkibun.firebaseio.com",
        projectId: "alkitabkibun",
        storageBucket: "alkitabkibun.appspot.com",
        messagingSenderId: "315411394638"
      };
      firebase.initializeApp(config);
  }
}
