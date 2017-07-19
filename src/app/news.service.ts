import {Injectable} from '@angular/core';
import {Http, Jsonp} from "@angular/http";

declare var $: any;

@Injectable()
export class NewsService{
  constructor(public jsonp:Jsonp) {
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
  getNews(tableNum,page,pagesize,justList){
    let url = 'http://api.dagoogle.cn/news/get-news?tableNum='+tableNum+'&page='+page+'&pagesize='+pagesize+'&callback=JSONP_CALLBACK&justList='+justList;
    return this.jsonp.get(url).toPromise().then(res=>{
      return res.json().data
    }).catch(err=>{
      let error;
      if (err.message){
        error = err.message
      }else{
        error = err;
      }
      return Promise.reject(error)
    })
  }
}
