import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
    currentUser : User;

    public login(credentials) {
        if (credentials.username === null || credentials.password === null) {
          return Observable.throw("Please insert credentials");
        } else {
          return Observable.create(observer => {
            let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
            let options = new RequestOptions({ headers: headers });

            var postParams = {
              username: credentials.username,
              password: credentials.password
            }
            console.log(postParams);

            this.http.post(`http://localhost/alkitab/public/api/login`, {
                  username: credentials.username,
                  password: credentials.password
                },options)
              .subscribe(data => {
                  var result = JSON.parse(data['_body']);
                  console.log(result);
                  // console.log(result.name, result.email);
                this.currentUser = new User(result['name'], result['email']);
                observer.next(data.ok);
                observer.complete();
               }, error => {
                   console.log(error);
                observer.next(error.ok);
                observer.complete();
              });
          });
        }
      }
    getUserInfo(){
      return this.currentUser;
    }

    logout() {
      return Observable.create(observer => {
        this.currentUser = null;
        observer.next(true);
        observer.complete();
      });
    }
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

}
