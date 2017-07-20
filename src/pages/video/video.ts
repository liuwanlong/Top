import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {VideoDetailPage} from "../video-detail/video-detail";

@Component({
  selector: 'page-contact',
  templateUrl: 'video.html'
})
export class VideoPage {
  newsArr = [];
  constructor(
    public navCtrl: NavController,
    public http:Http,
  ) {
    http.get('http://localhost:3000/video')
      .toPromise()
      .then(res=>{

          this.newsArr = res.json();
          console.log(this.newsArr)
      })
  }
  videoDetailPage(news:object,newsArr?:object){
    console.log(newsArr);
    var data = [news,newsArr];
    this.navCtrl.push(VideoDetailPage,data);
  }
}
