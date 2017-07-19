import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Headers, Http, Jsonp, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-about',
  templateUrl: 'news.html'
})
export class NewsPage {
  news:{}[];

  constructor(public navCtrl: NavController, public jsonp:Jsonp, public http:Http) {
    let headers = new Headers();
    headers.append('Authorization','APPCODE 0f375d8286b74ec6b4056e74d3afd4b7');
    http.get('http://toutiao-ali.juheapi.com/toutiao/index',{headers})
      .toPromise().then(
      res=>{
        var body = res.json();
        console.log(body.result.data);
        this.news = body.result.data;

        // for(let n of this.news){
        //
        //
        // }



        http.get(this.news[0]['url']).toPromise().then((res:Response)=>{
          let htmlStr = res['_body'];

          let fromIndex = htmlStr.indexOf('<article');
          let toIndex = htmlStr.indexOf('</article>');
          let resultStr = htmlStr.substring(fromIndex,toIndex) + '</article>';
          console.log(resultStr);
        })
      })
      .catch(this.handleError)
  }
  handleError(error){
    return Promise.reject(error.message||error);
  }
}
