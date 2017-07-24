import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the CollectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage implements OnInit {
    banner_slides: any;
    allnews: {}[];
    news: {}[];

    ngOnInit(): void {
        this.getData();
    }

  constructor(public navCtrl: NavController, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');
  }
    getData() {
        return this.http.get('http://localhost:3000/users/')
            .toPromise()
            .then(res => {
                var data = res.json().data;
                this.allnews = data;
                var endlength = this.allnews.length;
                this.banner_slides = this.allnews.slice(0, 2);
                this.news = this.allnews.slice(3, endlength);
                console.log(this.news.length);
            }).catch(this.handleError)
    }
    handleError(error) {
        return Promise.reject(error.message || error);
    }
}
