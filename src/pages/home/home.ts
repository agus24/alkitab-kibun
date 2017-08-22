import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    username  = "";
    email = "";
  constructor(public navCtrl: NavController,private auth : AuthProvider) {
      let info = auth.getUserInfo();
      console.log(auth.getUserInfo());
      this.username = info['username'];
      this.email = info['email'];

  }

  ionViewDidLoad() {
    console.log(this.username);
  }

}
