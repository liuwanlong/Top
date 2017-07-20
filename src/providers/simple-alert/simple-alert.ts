import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";

/*
  Generated class for the SimpleAlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SimpleAlertProvider {

  constructor(private http: Http, private alertCtrl: AlertController) {
  }

  // 弹窗
  showAlert(title:string, subTitle:string, buttons:[string]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    return alert.present();
  }
}

