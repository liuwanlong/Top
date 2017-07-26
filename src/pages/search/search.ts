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
    ionViewWillLoad() {
      this.getdata('');
    }

  getdata(val?:string){
    return this.http.get('http://59.110.165.55/users/'+ val)
      .toPromise()
      .then(res => {
        var data = res.json().data;
        this.flag = (data.length == 0)? true : false;
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
