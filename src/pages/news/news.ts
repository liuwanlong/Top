import {Component, OnInit} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {DetailPage} from "../detail/detail";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-about',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit{
  banner_slides: any;
  allnews: {}[];
  news: {}[];
  ngOnInit(): void {
    this.getData();
  }

  constructor(public navCtrl: NavController, public http: Http) {


    }
    getData(){
      return this.http.get('http://localhost:3000/users')
        .toPromise()
        .then(res => {
          var data = res.json().data;
          this.allnews = data;
          var endlength = this.allnews.length;
          this.banner_slides = this.allnews.slice(0,2);
          this.news = this.allnews.slice(3,endlength);
        }).catch(this.handleError)
    }
    handleError(error) {
      return Promise.reject(error.message || error);
    }
  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
  search(){
    this.navCtrl.push(SearchPage);
  }
}
