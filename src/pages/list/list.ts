import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NewsService} from "../../app/news.service";
import {DetailPage} from "../detail/detail";


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage implements OnInit {
    list_slides: any;
    type: any;
    ngOnInit(): void {
        this.getListNews();
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, private ns: NewsService) {
        switch (this.navParams.data){
            case 1:
                this.type= '头条新闻';
                break;
            case 2:
                this.type= '娱乐新闻';
                break;
            case 3:
                this.type= '军事新闻';
                break;
            case 4:
                this.type= '汽车新闻';
                break;
            case 5:
                this.type= '财经新闻';
                break;
            case 6:
                this.type= '笑话趣事';
                break;
            case 7:
                this.type= '体育新闻';
                break;
            case 8:
                this.type= '科技新闻';
                break;
        }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
  getListNews() {
    this.ns.getNews(this.navParams.data).then(data => {
      this.list_slides = data.reverse();
    })
  }
    doRefresh(refresher) {
        this.getListNews();
        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

}
