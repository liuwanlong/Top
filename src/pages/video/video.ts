import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Jsonp} from "@angular/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'video.html'
})
export class VideoPage {

  constructor(
    public navCtrl: NavController,
    public http:Http,
    public jsonp:Jsonp
  ) {
    http.get('http://api.dagoogle.cn/news/get-news?tableNum=1&pagesize=4&callback=?&justList=1')
      .toPromise()
      .then(res=>{
          console.log(res);
      })
  }
}
