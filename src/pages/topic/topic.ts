import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TopicServiceProvider} from "../../providers/topic-service/topic-service";
import {User} from "../../app/user";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";
import {GettimeProvider} from "../../providers/gettime/gettime";
import {Http} from "@angular/http";
import {TopicDetailPage} from "../topic-detail/topic-detail";


@Component({
    selector: 'page-topic',
    templateUrl: 'topic.html',
})
export class TopicPage implements OnInit {
    topics: any;
    topic: any;
    user: User;
    num: number;

    ngOnInit(): void {
        this.num = 1;
    }

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public sa: SimpleAlertProvider,
                public gt: GettimeProvider,
                private ts: TopicServiceProvider,
                public http: Http) {
        ts.getTopicDetail(navParams.data).then(data => {
            this.topics = data.reverse();
        })
    }

    doOrder(num) {
        this.num = num;
        var data = this.topics;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                if (num == 2) {
                    if ((data[j].rp_count + data[j].vote_up) < (data[j + 1].rp_count + data[j + 1].vote_up)) {
                        let item = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = item;
                    }
                } else if (num == 1) {
                    if (data[j].t_id < data[j + 1].t_id) {
                        let item = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = item;
                    }
                } else if (num == 0) {
                    if (data[j].t_id > data[j + 1].t_id) {
                        let item = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = item;
                    }
                }
            }
        }
        this.topics = data;
    }

    goTopicDetail(topic) {
        this.navCtrl.push(TopicDetailPage, topic);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TopicPage');
    }

    doPrompt(t) {
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
                        var topic = {
                            t_con: data.topic_con,
                            t_from: this.user.username,
                            t_to: t.t_from,
                            t_to_t: t.t_id,
                            news_id: t.news_id,
                            t_time: this.gt.getNowFormatDate()
                        };
                        this.ts.sendTopic(topic, t.t_id);
                    }
                }
            ]
        });
        prompt.present();
    }

    vote(topic, type) {
        this.topic = topic;
        if (type) {
            this.topic.vote_up++;
        } else {
            this.topic.vote_down++;
        }
        this.ts.doVote(topic.t_id, type).then(data => {
            console.log(data);
            //data为真投票成功
            if (data) {

            } else {

            }
        })
    }
}
