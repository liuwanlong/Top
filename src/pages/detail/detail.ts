import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slide = navParams.data;
  }

  ionViewDidLoad() {
    //当页面加载的时候
    // console.log('ionViewDidLoad DetailPage');
  }

}
