import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GetCollectionProvider} from "../../providers/get-collection/get-collection";
import {User} from "../../app/user";
import {DetailPage} from "../detail/detail";


@Component({
    selector: 'page-collect',
    templateUrl: 'collect.html',
})
export class CollectPage {
    currentUser: User;
    noNews: boolean;
    news: {}[];

    constructor(public navCtrl: NavController, public np: NavParams,
                public gc: GetCollectionProvider) {
        this.currentUser = np.get('user');
        this.gc.myCollection(this.currentUser.mobile).then(data => {
            if (data.result.length > 0) {
                this.news = data.result;
                this.noNews = false;
            } else {
                this.noNews = true;
            }
        })
    }

    delItem(news_id:string){
        this.gc.delCollection(this.currentUser.mobile,news_id).then(data=>{
            if(data){
                for (let idx in this.news){
                    if (this.news[idx]['news_id'] == news_id){
                        this.news.splice(~~(idx),1);
                    }
                }
            }else{
                console.log('删除失败');
            }
        })
    }

    goDetail(slide) {
        this.navCtrl.push(DetailPage, slide);
    }

    ionViewDidLoad() {
    }
}
