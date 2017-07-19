import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  items = [
    {icon: "star", name: "我的收藏", nav: "CollectionPage"},
    {icon: "text", name: "消息通知", nav: "NotifyPage"},
    {icon: "settings", name: "设置", nav: "MinePage"},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }


  toRegisterPage(param?: Object) {
    this.navCtrl.push(RegisterPage, param);
  }

  toLoginPage(param?: Object) {
    this.navCtrl.push(LoginPage, param);
  }

  // back(){
  //   this.navCtrl.pop();
  // }


}
