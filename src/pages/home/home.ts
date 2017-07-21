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
    {icon: 'thumbs-up', name: '推荐',type:1},
    {icon: 'bulb', name: '热点',type:1},
    {icon: 'pin', name: '本地',type:1},
    {icon: 'book', name: '社会',type:1},
    {icon: 'musical-notes', name: '娱乐',type:2},
    {icon: 'jet', name: '科技',type:8},
    {icon: 'basketball', name: '体育',type:7},
    {icon: 'globe', name: '频道',type:1},
  ];

  constructor(public navCtrl: NavController, private ns: NewsService) {
  }

  getData(typeNum) {
    this.ns.getNews(typeNum).then(data => {
      this.initTopNews = data;
      this.banner_slides = this.initTopNews.slice(0,3);
      this.list_slides = this.initTopNews.slice(3,6);
    })
  }
  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
  goList(type){
    this.navCtrl.push(ListPage,type);
  }
  search(){
    this.navCtrl.push(SearchPage);
  }
}
