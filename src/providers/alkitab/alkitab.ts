import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the AlkitabProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlkitabProvider {
url = "http://gustiawan.com/kibun-backend/public/index.php";
  constructor(public http: Http) {
    console.log('Hello AlkitabProvider Provider');
  }

  public getKitab() {
      return Observable.create(observer => {
              this.http.get(this.url+"/api/getKitab")
              .subscribe(data => {
                  var result = JSON.parse(data['_body']);
                  console.log(result);
                  observer.next({allow : data.ok, result : result });
                  observer.complete();
               }, error => {
                 observer.next(error.ok);
                 observer.complete();
              });
          });
  }
  public getAyatPasalList(kitab: string) {
      return Observable.create(observer => {
              this.http.get(this.url+"/api/getPasalAyat/"+kitab)
              .subscribe(data => {
                  var result = JSON.parse(data['_body']);
                  observer.next({allow : data.ok, result : result });
                  observer.complete();
               }, error => {
                 observer.next({allow : error.ok});
                 observer.complete();
              });
          });
  }
  public getFirman(kitab:string,pasal,ayat) {
    return Observable.create(observer => {
      this.http.get(this.url+"/api/getFirman/"+kitab+"/"+pasal+"/"+ayat)
        .subscribe(data => {
          var result = JSON.parse(data['_body']);
          console.log(result);
          observer.next({allow : data.ok, result : result });
          observer.complete();
        }, error => {
            observer.next({allow : error.ok});
            observer.complete();
        });
    })
  }
}
