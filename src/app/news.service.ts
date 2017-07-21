import {Injectable} from '@angular/core';

// declare var $: any;
import {Http} from "@angular/http";

@Injectable()
export class NewsService {
  type = ['toutiao', 'yule', 'junshi', 'qiche', 'caijing', 'xiaohua', 'tiyu', 'keji'];

  constructor(public http: Http) {
  }

  /*
   * tableNum:新闻分类
   *        1 =>  头条
   *        2 =>  娱乐
   *        3 =>  军事
   *        4 =>  汽车
   *        5 =>  财经
   *        6 =>  笑话
   *        7 =>  体育
   *        8 =>  科技
   * page:当前页,第几页
   * pagesize: 每页显示数目
   * justList: 是否仅扣回新闻列表 1是0否
   * */
  getNews(typeNum) {
    console.log(this.type[typeNum - 1]);
    return this.http.get('http://localhost:3000/getnews' + '/' + this.type[typeNum - 1])
      .toPromise()
      .then(res => {
        var data = res.json().data;
        return data;
      }).catch(this.handleError)
  }

  handleError(error) {
    return Promise.reject(error.message || error)
  }
}
