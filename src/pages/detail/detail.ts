import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  slide: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
    this.slide = navParams.data;
  }

  ionViewDidLoad() {
    //当页面加载的时候
    // console.log('ionViewDidLoad DetailPage');
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: '评论',
      message: "说点什么吧....",
      inputs: [
        {
          name: 'topic-cont',
          type: 'text'
        },
      ],
      buttons:[
        {
          text:'取消',
          handler:data=>{
            console.log('点击了取消');
          }
        },
        {
          text:'发送',
          handler:data=>{
            console.log('点击了发送');
          }
        }
      ]
    });
    prompt.present();
  }

}
