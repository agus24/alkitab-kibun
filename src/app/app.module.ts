import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ListAlkitabPage } from '../pages/list-alkitab/list-alkitab';
import { ListAlkitabDetailPage } from '../pages/list-alkitab-detail/list-alkitab-detail';
import { ModalAlkitabDetailPage } from "../pages/modal-alkitab-detail/modal-alkitab-detail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AlkitabProvider } from '../providers/alkitab/alkitab';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ListAlkitabPage,
    ListAlkitabDetailPage,
    ModalAlkitabDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ListAlkitabPage,
    ListAlkitabDetailPage,
    ModalAlkitabDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AlkitabProvider
  ]
})
export class AppModule {}
