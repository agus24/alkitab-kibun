import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController , NavParams, LoadingController ,AlertController, Loading } from 'ionic-angular';
import { AlkitabProvider } from '../../providers/alkitab/alkitab';
import { ListAlkitabDetailPage } from '../../pages/list-alkitab-detail/list-alkitab-detail';
import { ModalAlkitabDetailPage } from "../modal-alkitab-detail/modal-alkitab-detail";

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
    pasal;
    ayat;
    firman;

  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertCtrl: AlertController,
                private Alkitab: AlkitabProvider,
                private loadingCtrl: LoadingController,
                public modalCtrl: ModalController) {
    this.showLoading();
      Alkitab.getKitab().subscribe(allowed => {
         if (allowed.allow) {
           this.alkitab = allowed.result;
         }
         else {
           this.showError("Cannot Get Data");
         }
      });
  }

  cari() {
    var kitab = this.kitab;
    var pasal = this.pasal;
    var ayat = this.ayat;
    this.Alkitab.getFirman(kitab,pasal,ayat).subscribe(allowed => {
      if(allowed.allow) {
        console.log(allowed.result);
        this.firman = allowed.result;
        console.log(this.firman);
        this.modalCtrl.create(ModalAlkitabDetailPage,{firman : this.firman}).present();
      }
      else{
        this.showError("Error While Getting Data");
      }
    });
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
