import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {User} from "../../app/user";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";
import {CollectPage} from "../collect/collect";

@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html',
})
export class MinePage {
    currentUser: User;
    slide: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private as: SimpleAlertProvider) {
        this.currentUser = new User();
        this.slide = navParams.data;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MinePage');
    }

    ionViewWillEnter() {
        this.currentUser = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null;
    }

    toRegisterPage(param?: Object) {
        this.navCtrl.push(RegisterPage, param);
    }

    toLogout() {
        this.as.showConfirm('提示', '确定要退出吗？', ['取消', () => {}]
            , ['确定', () => {
            localStorage.currentUser = null;
            this.currentUser = null;
        }]);
    }

    toLoginPage(param?: Object) {
        this.navCtrl.push(LoginPage, param);
    }

    doPrompt() {
        if (!this.currentUser) {
            return this.as.showAlert('', '您还没有登录，请登录后重试', ['确定']);
        } else {
            this.navCtrl.push(CollectPage,{user: this.currentUser});
        }
    }

}
