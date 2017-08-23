import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalAlkitabDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-alkitab-detail',
  templateUrl: 'modal-alkitab-detail.html',
})
export class ModalAlkitabDetailPage {
    firman;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      console.log(navParams);
      this.firman = navParams.data.firman;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAlkitabDetailPage');
  }

}
