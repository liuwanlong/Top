import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";

@Injectable()
export class SimpleAlertProvider {

    constructor(private alertCtrl: AlertController) {
    }

    // 弹窗
    showAlert(title: string, subTitle: string, buttons: [string]) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: buttons
        });
        return alert.present();
     }

    showPrompt(title, message, cssClass, [inp1, ph1], [inp2, ph2],
               [btntxt1, btncb1], [btntxt2, btncb2]) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: inp1,
                    placeholder: ph1,
                },
                {
                    name: inp2,
                    placeholder: ph2
                },
            ],
            cssClass: cssClass,
            buttons: [
                {
                    text: btntxt1,
                    handler: btncb1
                    //     data => {
                    //   console.log('Cancel clicked');
                    // }
                },
                {
                    text: btntxt2,
                    handler: btncb2
                }
            ]
        });
        prompt.present();
    }

    showOneInput(title, message, [inp, ph], [btntxt1, btncb1], [btntxt2, btncb2]) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            inputs: [
                {
                    name: inp,
                    placeholder: ph,
                },
            ],
            buttons: [
                {
                    text: btntxt1,
                    handler: btncb1
                },
                {
                    text: btntxt2,
                    handler: btncb2
                }
            ]
        });
        prompt.present();
    }

    showConfirm(title, message, [btntxt1, btncb1], [btntxt2, btncb2]) {
        let confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: btntxt1,
                    handler: btncb1
                },
                {
                    text: btntxt2,
                    handler: btncb2
                }
            ]
        });
        confirm.present();
    }

}

