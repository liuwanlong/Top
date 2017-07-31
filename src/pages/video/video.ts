import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import {VideoDetailPage} from "../video-detail/video-detail";
import {SearchPage} from "../search/search";

@Component({
    selector: 'page-contact',
    templateUrl: 'video.html'
})
export class VideoPage implements OnInit {

    newsArr = [];
    data = [];
    number = 5;
    id = 1;
    isHasMore: boolean;

    constructor(public navCtrl: NavController,
                public http: Http,) {
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        return this.http.get('http://59.110.165.55:1007/video?id='+this.id+'&number='+this.number)
            .toPromise()
            .then(res => {
                this.newsArr = res.json();
            })
    }

    videoDetailPage(news: object, newsArr?: object) {
        var data = [news, newsArr];
        this.navCtrl.push(VideoDetailPage, data);
    }
    selectClass(id:number){
        this.isHasMore = false;
        console.log(id);
        this.id = id;
        this.number = 5;
       this.getData();
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
        this.number += 5;
        setTimeout(() => {
            if (this.number >= 20) {
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
