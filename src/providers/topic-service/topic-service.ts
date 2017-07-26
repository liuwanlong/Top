import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SimpleAlertProvider} from "../simple-alert/simple-alert";

/*
  Generated class for the TopicServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TopicServiceProvider {

  constructor(public http: Http,public sa: SimpleAlertProvider) {
    console.log('Hello TopicServiceProvider Provider');
  }
  //得到某个新闻的所有评论
  getTopicDetail(news_id){
    return this.http.get('http://59.110.165.55/topic/'+news_id)
      .toPromise().then(res=>{
        var data = res.json().data;
        return data;
      }).catch(this.handleError)
  }
  //得到某个评论的所有子评论
  getTopicChildren(t_id){
      return this.http.get('http://59.110.165.55/topic/children/'+t_id)
          .toPromise().then(res=>{
              return res.json().data;
          })
  }
  //投票
  doVote(id,type){
      return this.http.post('http://59.110.165.55/topic/vote',{id:id,type:type})
          .toPromise().then(res=>{
              return res.json().success;
          })
  }
  //发送评论
  sendTopic(topic,to_id){
      this.http.post('http://59.110.165.55/topic', topic)
          .toPromise().then(res => {
          if (res.json().success) {
              this.sa.showAlert('', '评论成功!', ['确定']);
              this.http.post('http://59.110.165.55/topic/add_rply', {id:to_id})
                  .toPromise().then(res => {
                  if (res.json().success) {
                      console.log('回复数+1!');
                  }
              })
          } else {
              this.sa.showAlert('', '评论失败!', ['确定']);
          }
      })
  }
  handleError(error) {
    return Promise.reject(error.message || error)
  }
}
