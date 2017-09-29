import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ListAlkitabPage } from '../pages/list-alkitab/list-alkitab';

import { AuthProvider } from "../providers/auth/auth";
import { OneSignal } from "@ionic-native/onesignal";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(private oneSignal: OneSignal, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth:AuthProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'List Alkitab', component: ListAlkitabPage }
    ];

    this.oneSignal.startInit('faf1cd1c-6be4-43ca-adf5-d5a916861120', '315411394638');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((received) => {
      console.log(received);
    });

    this.oneSignal.enableSound(true);
    this.oneSignal.enableVibrate(true);
    
    this.oneSignal.handleNotificationOpened().subscribe((result) => {
      let data = result.notification.payload.additionalData;
      
      if(data.tipe == "reminder") {
        console.log('reminder');
      }
    });
    
    this.oneSignal.endInit();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.auth.logout().subscribe(succ => {
      console.log('masuk')
      this.nav.push(LoginPage)
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
