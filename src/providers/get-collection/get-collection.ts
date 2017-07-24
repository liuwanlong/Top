import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetCollectionProvider {
    news = {};

    constructor(public http: Http) {
    }

    myCollection(mobile: string){
        return this.http.get('http://localhost:3000/users/my_coll/'+mobile)
            .toPromise().then(result => {
                return result.json();
            });
    }

    isHasCollection(mobile: string, news_id: string){
        this.news = {
            mobile: mobile,
            news_id: news_id
        }
        return this.http.post('http://localhost:3000/users/ishas', this.news)
            .toPromise().then(result => {
            if(result.json().success){
                return true;
            }else{
                return false;
            }
        });
    }

    addCollection(mobile: string, news_id: string) {
        this.news = {
            mobile: mobile,
            news_id: news_id
        }
        return this.http.post('http://localhost:3000/users/news', this.news)
            .toPromise().then(result => {
            if(result.json().success){
                return true;
            }else{
                return false;
            }
        });

    }

    delCollection(mobile: string, news_id: string) {
        this.news = {
            mobile: mobile,
            news_id: news_id
        }
        return this.http.post('http://localhost:3000/users/del_collect', this.news)
            .toPromise().then(result => {
            if(result.json().success){
                return true;
            }else{
                return false;
            }
        });
    }

}
