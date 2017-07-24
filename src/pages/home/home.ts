import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import "rxjs/add/operator/map";
import {NewsService} from "../../app/news.service";
import {DetailPage} from "../detail/detail";
import {ListPage} from "../list/list";
import {SearchPage} from "../search/search";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  initTopNews: any;
  banner_slides: any;
  list_slides: any;

  ngOnInit(): void {
    this.getData(1);
  }

  cates = [
    {icon: 'thumbs-up', name: '头条',type:1},
    {icon: 'bulb', name: '热点',type:1},
    {icon: 'musical-notes', name: '娱乐',type:2},
    {icon: 'pin', name: '军事',type:3},
    {icon: 'globe', name: '汽车',type:4},
    {icon: 'book', name: '财经',type:5},
    {icon: 'basketball', name: '体育',type:7},
    {icon: 'jet', name: '科技',type:8}
  ];

  constructor(public navCtrl: NavController, private ns: NewsService) {
  }

  getData(typeNum) {
    this.ns.getNews(typeNum).then(data => {
      this.initTopNews = data;
      this.initTopNews=this.initTopNews.reverse();
      this.banner_slides = this.initTopNews.slice(0,3);
      this.list_slides = this.initTopNews.slice(3,6);
    })
  }
  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
  goList(type,){
    this.navCtrl.push(ListPage,type);
  }
  search(){
    this.navCtrl.push(SearchPage);
  }
  doRefresh(refresher) {
      this.getData(1);
      setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
      }, 1500);
  }

}
