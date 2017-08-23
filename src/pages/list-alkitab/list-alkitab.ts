import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController ,AlertController, Loading } from 'ionic-angular';
import { AlkitabProvider } from '../../providers/alkitab/alkitab';
import { ListAlkitabDetailPage } from '../../pages/list-alkitab-detail/list-alkitab-detail';

/**
 * Generated class for the ListAlkitabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-alkitab',
  templateUrl: 'list-alkitab.html',
})
export class ListAlkitabPage {
    alkitab;
    loading;
    kitab;

  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertCtrl: AlertController,
                private Alkitab: AlkitabProvider,
                private loadingCtrl: LoadingController) {
    this.showLoading();
      Alkitab.getKitab().subscribe(allowed => {
         if (allowed.allow) {
           this.alkitab = allowed.result;
         }
         else {
           this.showError("Cannot Get Data");
         }
      });
      console.log(this.alkitab);
  }

  showDetailKitab(kitab:string) {
    this.navCtrl.push(ListAlkitabDetailPage, {kitab});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAlkitabPage');
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
