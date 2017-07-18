import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import "rxjs/add/operator/map";
declare var $: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides = [
    {
      title: '8根电线杆成"路霸" 行车如过"梅花桩"',
      image: "http://cms-bucket.nosdn.127.net/ee96d28a742c43a792d244d836dfcd8020170718082126.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1"
    },
    {
      title: '这位大老虎退休后两次被查 从公诉到一审仅用10天',
      image: "http://cms-bucket.nosdn.127.net/998f555b33044df68d71cbec2a6d8fdb20170718093803.png?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1"
    },
  ];
  cates = [
    {icon: 'thumbs-up', name: '推荐'},
    {icon: 'bulb', name: '热点'},
    {icon: 'pin', name: '本地'},
    {icon: 'book', name: '社会'},
    {icon: 'musical-notes', name: '娱乐'},
    {icon: 'jet', name: '科技'},
    {icon: 'basketball', name: '体育'},
    {icon: 'globe', name: '频道'},
  ];

  constructor(public navCtrl: NavController) {
  }

  getData() {
    let url = 'http://api.dagoogle.cn/news/single-news?callback=?&tableNum=1&news_id=64185';
    $.getJSON(url,function(d){
      console.log(d);
    })
  }
}
