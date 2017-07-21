import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {DetailPage} from "../detail/detail";
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit{
  items:{}[];
  values = '';
  flag = false;
  ngOnInit(): void {
  }
  constructor(public navCtrl: NavController, public http: Http) {

  }
  getdata(event){
    return this.http.get('http://localhost:3000/users/'+ event)
      .toPromise()
      .then(res => {
        var data = res.json().data;
        console.log(data);
        if(data == ''){
          this.flag = !this.flag;
        }
        this.items = data;
      }).catch(this.handleError)
  }
  handleError(error) {
    return Promise.reject(error.message || error);
  }
  onKey(event: any) { // without type info
    this.values = event.target.value;
    // console.log(this.values);
    this.getdata(this.values);
  }
  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
}
