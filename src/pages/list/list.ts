import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NewsService} from "../../app/news.service";
import {DetailPage} from "../detail/detail";

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage implements OnInit {
  list_slides: any;

  ngOnInit(): void {
    this.getListNews();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private ns: NewsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
  getListNews() {
    this.ns.getNews(this.navParams.data).then(data => {
      this.list_slides = data;
    })
  }

}
