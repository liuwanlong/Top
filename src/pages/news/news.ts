import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {DetailPage} from "../detail/detail";
import {SearchPage} from "../search/search";

@Component({
    selector: 'page-about',
    templateUrl: 'news.html'
})
export class NewsPage implements OnInit {
    banner_slides: any;
    allnews: {}[];
    news: {}[];
    page = 0;
    isHasMore: boolean;

    ngOnInit(): void {
        this.getData();
    }

    constructor(public navCtrl: NavController, public http: Http) {
        this.isHasMore = true;
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

    // getMore
    getMore(page: number) {
        return this.http.get('http://localhost:3000/users/page/' + page)
            .toPromise()
            .then(res => {
                var data = res.json().data;
                if(data.length>0){
                    for (let item of data) {
                        this.news.push(item);
                    }
                }else{
                    this.isHasMore = false;
                }
            }).catch(this.handleError)
    }

    handleError(error) {
        return Promise.reject(error.message || error);
    }

    goDetail(slide) {
        this.navCtrl.push(DetailPage, slide);
    }

    search() {
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
        if(!this.isHasMore){
            infiniteScroll.complete();
            return;
        }
        setTimeout(() => {
            this.getMore(++this.page);
            infiniteScroll.complete();
        }, 500);
    }
}
