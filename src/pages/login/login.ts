import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AgreementPage} from "../agreement/agreement";
import {Http} from "@angular/http";
import {Login} from "../../app/login";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    login: Login;

    constructor(public navCtrl: NavController, public http: Http) {
        this.login = new Login();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    toAgreement(param?: Object) {
        this.navCtrl.push(AgreementPage, param)
    }

    loginSubmit(login: Login) {
        this.http.post('http://localhost:3000/users/login',login)
            .toPromise().then(result=>{
            if(result.json().result==false){
                // showAlert('登陆结果','登录失败！请检查您的用户名或密码','确定')
            }else{      // 如果登录成功，存储个人信息、跳转、（同步个人设置）
                localStorage.urrentUser = JSON.stringify(result.json().result);
                // console.log(JSON.parse(localStorage.currentUser));
                this.navCtrl.pop();
            }
        })
    }

}
