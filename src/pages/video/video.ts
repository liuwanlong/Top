import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {VideoDetailPage} from "../video-detail/video-detail";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-contact',
  templateUrl: 'video.html'
})
export class VideoPage implements OnInit{

  newsArr = [];
  number = 5;
  isHasMore:boolean;

  constructor(
    public navCtrl: NavController,
    public http:Http,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.number += 5;
    return this. http.get('http://localhost:3000/video/'+ this.number)
        .toPromise()
        .then(res=>{

          this.newsArr = res.json();
          // console.log(this.newsArr)
        })
  }

  videoDetailPage(news:object,newsArr?:object){
    var data = [news,newsArr];
    this.navCtrl.push(VideoDetailPage,data);
  }
  search(){
    this.navCtrl.push(SearchPage);
  }
  doRefresh(refresher) {
    this.getData();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }
  doInfinite(infiniteScroll) {
      this.number += 5;
      // console.log(this.number);
    setTimeout(() => {
      if(this.number == 35){
        infiniteScroll.complete();
        this.isHasMore = true;
        return;
      }

      this.getData();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
