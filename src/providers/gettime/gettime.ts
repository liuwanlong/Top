import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GettimeProvider {
    month:any;
    strDate:any;
    constructor(public http: Http) {
    }

    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        this.month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (this.month >= 1 && this.month <= 9) {
            this.month = "0" + this.month;
        }
        if (this.strDate >= 0 && this.strDate <= 9) {
            this.strDate = "0" + this.strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + this.month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
}
