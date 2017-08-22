import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController , Loading, IonicPage } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    loading;
    loginData = {
        username : "",
        password : ""
    };

    constructor(private nav: NavController,
                 private alertCtrl: AlertController,
                 private auth : AuthProvider,
                 private loadingCtrl: LoadingController) { }

  login() {
      this.showLoading();
      if(this.loginData.username == "" || this.loginData.password == "") {
          this.showError("Username And Password Must Fill");
      }
      else{
          this.auth.login(this.loginData).subscribe(allowed => {
              if (allowed) {
                this.nav.push(HomePage);
              } else {
                this.showError("Access Denied");
              }
            },
          error => {
            this.showError(error);
          });
      }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
