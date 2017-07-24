import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';


@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: '恭喜！当前已是最新版本',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

}
