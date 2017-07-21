import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the VideoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})


  export class VideoDetailPage {
    videoUrl:any;
    news = [];
    newsArr = [];
    videoArr = [];
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private sanitizer:DomSanitizer
  ) {
    this.news = navParams.data[0];
    this.newsArr = navParams.data[1];
    this.videoArr = this.newsArr.slice(1,6);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(navParams.data[0].url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoDetailPage');
  }
  videoDetailPage(news:object,newsArr?:object){
    console.log(newsArr);
    var data = [news,newsArr];
    this.navCtrl.push(VideoDetailPage,data);
  }

}
