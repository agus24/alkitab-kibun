import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ModalController } from 'ionic-angular';
import { AlkitabProvider } from '../../providers/alkitab/alkitab';
import { ModalAlkitabDetailPage } from "../modal-alkitab-detail/modal-alkitab-detail";

/**
 * Generated class for the ListAlkitabDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-alkitab-detail',
  templateUrl: 'list-alkitab-detail.html',
})
export class ListAlkitabDetailPage {
    data;
    judul;
    loading;
  constructor(public navCtrl: NavController,
                   private alertCtrl : AlertController ,
                   private loadingCtrl : LoadingController,
                   public navParams: NavParams,
                   private alkitab: AlkitabProvider,
                   public modalCtrl: ModalController) {
      this.showLoading();
      this.judul = navParams.data.kitab;
      alkitab.getAyatPasalList(navParams.data.kitab).subscribe(result => {
          console.log(result)
          if(result.allow){
              this.data = result.result;
          }
          else{
              this.showError("Cannot Get Data");
          }
      });
  }
  showDetail(pasal,ayat){
      let firman = this.data[pasal-1].ayat[ayat-1];
      let modal = this.modalCtrl.create(ModalAlkitabDetailPage,{firman});
        modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAlkitabDetailPage');
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
