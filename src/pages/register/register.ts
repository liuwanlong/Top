import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AgreementPage} from "../agreement/agreement";
import {User} from "../../app/user";
import {Http} from "@angular/http";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    user: User;                     // 用户对象
    secPwd: {};                     // 确认密码
    showPwd: boolean;               // 是否显示明文密码

    mobileReg = /1[3578]\d{9}/;
    emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;

    constructor(public navCtrl: NavController,
                public http: Http, private alertCtrl: AlertController,private as: SimpleAlertProvider) {
        this.user = new User();
        this.secPwd = {};
        this.showPwd = false;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    // 查看每日头条使用协议
    toAgreement(param?: Object) {
        this.navCtrl.push(AgreementPage, param)
    }

    // 弹窗
    showAlert(title:string, subTitle:string, buttons:[string]) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: buttons
        });
        alert.present();
    }

    // 注册事件
    regSubmit(user: User) {
        this.http.post('http://59.110.165.55:1007/users', user)
            .toPromise().then(result => {
            if (result.json().result == 'nameExit') {
                this.as.showAlert('注册结果','该用户名已被注册！',['确定']);
            } else if (result.json().result == 'mobileExit') {
                this.as.showAlert('注册结果','该手机号已被注册！请更换手机号',['确定']);
            } else {
                this.as.showAlert('注册结果','恭喜！注册成功！',['确定']);
                this.navCtrl.pop();
            }
        });
    }

}
