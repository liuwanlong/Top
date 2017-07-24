import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TopicPage} from "../topic/topic";
import {User} from "../../app/user";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";
import {GettimeProvider} from "../../providers/gettime/gettime";
import {Http} from "@angular/http";
import {GetCollectionProvider} from "../../providers/get-collection/get-collection";

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {
    slide: any;
    isColl: boolean;
    user: User;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public sa: SimpleAlertProvider,
                public gt: GettimeProvider,
                public gc: GetCollectionProvider,
                public http: Http) {
        this.user = new User();
        this.slide = navParams.data;
        this.slide.v_count += 1;
        http.post('http://localhost:3000/view', {id: this.slide.news_id})
            .toPromise().then(res => {
            if (res.json().success) {
                console.log('v_count++成功');
            } else {
                console.log('v_count++失败');
            }
        })
    }

    goTopic(id) {
        this.navCtrl.push(TopicPage, id);
    }

    ionViewWillEnter() {
        this.user = localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null;
        this.gc.isHasCollection(this.user.mobile, this.slide.news_id).then(data => {
            this.isColl = data;
        });
    }

    doPrompt(news_id) {
        this.user = JSON.parse(localStorage.currentUser);
        if (!this.user) {
            return this.sa.showAlert('', '还没登录,不能发表评论哦!', ['确定']);
        }
        let prompt = this.alertCtrl.create({
            title: '评论',
            message: "说点什么吧....",
            inputs: [
                {
                    name: 'topic_con',
                    type: 'text'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('点击了取消');
                    }
                },
                {
                    text: '发送',
                    handler: data => {
                        let topic = {
                            t_con: data.topic_con,
                            t_from: this.user.username,
                            news_id: news_id,
                            t_time: this.gt.getNowFormatDate()
                        };
                        console.log(topic);
                        this.http.post('http://localhost:3000/topic', topic)
                            .toPromise().then(res => {
                            if (res.json().success) {
                                this.slide.r_count += 1;
                                this.sa.showAlert('', '评论成功!', ['确定']);
                            } else {
                                this.sa.showAlert('', '评论失败!', ['确定']);
                            }
                        })
                    }
                }
            ]
        });
        prompt.present();
    }

    collect(news_id: string) {
        if (!this.user) {
            return this.sa.showAlert('提示', '您还没有登录！请登录后重试', ['确定']);
        }

        if(!this.isColl){           // 添加收藏
            this.gc.addCollection(this.user.mobile, news_id).then(data=>{
                this.isColl = data;
            })
        }else{                      // 取消收藏
            return this.sa.showConfirm('提示','您已收藏改文章，是否取消该收藏？',['取消',()=>{}],['确定',()=>{
                this.gc.delCollection(this.user.mobile, news_id).then(data=>{
                    this.isColl = !data;
                })
            }]);
        }
    }

}