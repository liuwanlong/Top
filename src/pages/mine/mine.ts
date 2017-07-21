import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {User} from "../../app/user";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  currentUser: User;
  // items = [
  //   {icon: "star", name: "我的收藏", nav: CollectionPage},
  //   {icon: "text", name: "消息通知", nav: NotifyPage},
  //   {icon: "settings", name: "设置", nav: MinePage},
  // ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private as: SimpleAlertProvider) {
    // localStorage.currentUser = null;      // 测试用，用来清除当前登录用户
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  ionViewWillEnter(){
    this.currentUser = localStorage.currentUser? JSON.parse(localStorage.currentUser): null;
  }

  toRegisterPage(param?: Object) {
    this.navCtrl.push(RegisterPage, param);
  }

  toLogout(){
    this.as.showConfirm('提示','确定要退出吗？',['取消',()=>{}],['确定',()=>{
      localStorage.currentUser = null;
      this.currentUser = null;
    }]);
  }

  toLoginPage(param?: Object) {
    this.navCtrl.push(LoginPage, param);
  }

}
