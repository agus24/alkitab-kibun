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
          firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password).then((data) => {
            console.log(data);
            observer.next({
              message:"success",
              status : true
            });
          }, error => {
            observer.next({
              message:error,
              status : false
            });
          });
        });
      }
    }

    register(data) {
      console.log(data)
      return Observable.create(observer => {
        firebase.auth().createUserWithEmailAndPassword(data.username,data.password).then(data => {
          observer.next({
            message : "success",
            allow : true
          });
          observer.complete();
        }, (error) => {
          console.log(error)
          observer.next({
            message: error.message,
            allow : false
          });
          observer.complete();
        });
      });
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


  loginGoogle() {
    return Observable.create(observer => {
      var provider = new firebase.auth.GoogleAuthProvider();
      var user;
      alert('masuk');
      firebase.auth().signInWithRedirect(provider);
      alert('masuk');
      firebase.auth().getRedirectResult().then(function(result) {
        console.log(result);
        localStorage.setItem('token',result.credential.accessToken);
        user = result.user;
        localStorage.setItem('name',user.displayName);
        localStorage.setItem('email',user.email);
        observer.next({
          message:"success",
          status : true
        });
        observer.complete();
      }).catch(function(error) {
        observer.next({
          message : error.message,
          status : false
        });
        observer.complete();
      });
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
