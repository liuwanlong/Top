import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TopicPage} from "../topic/topic";
import {User} from "../../app/user";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";
import {GettimeProvider} from "../../providers/gettime/gettime";
import {Http} from "@angular/http";

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
    user: User

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public sa: SimpleAlertProvider,
                public gt: GettimeProvider,
                public http: Http) {
        this.user = new User();
        this.slide = navParams.data;
        // console.log(localStorage.currentUser);
    }

    goTopic(id) {
        this.navCtrl.push(TopicPage, id);
    }

    ionViewDidLoad() {
        //当页面加载的时候
        // console.log('ionViewDidLoad DetailPage');
    }

    doPrompt(news_id) {
        this.user = JSON.parse(localStorage.currentUser);
        if (!this.user.username) {
            this.sa.showAlert('', '还没登录,不能发表评论哦!', ['确定']);
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

}
