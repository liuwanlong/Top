import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AgreementPage} from "../agreement/agreement";
import {Http} from "@angular/http";
import {Login} from "../../app/login";
import {SimpleAlertProvider} from "../../providers/simple-alert/simple-alert";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    login: Login;

    constructor(public navCtrl: NavController,
                public http: Http,private as: SimpleAlertProvider) {
        this.login = new Login();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    toAgreement(param?: Object) {
        this.navCtrl.push(AgreementPage, param)
    }

    revisePwd(){
        this.as.showPrompt('找回密码','请输入手机号和邮箱，我们将帮您找回您的密码',
            'to_center',
            ['mobile','手机号（11位）'],['email','邮箱'],
            ['取消',()=>{return}],['提交',(data)=>{
                this.http.post('http://localhost:3000/users/find',data)
                    .toPromise().then(result=>{
                    if(result.json().result==false){
                        this.as.showAlert('抱歉！','您输入的信息有误，找回密码失败',['确定']);
                    }else{
                        // 如果找回密码，显示，询问是否要更改密码
                        let login = result.json().result;
                        this.as.showOneInput('找回结果', '恭喜！您的密码是：'
                            +result.json().result.password, ['password','新密码（6~16位）'],
                            ['不需要', ()=>{}], ['修改', (pwd)=>{
                                if(pwd.password.length<6 && pwd.password.length>16){
                                    return false;
                                }else{
                                    login.password = pwd.password;
                                    this.http.put('http://localhost:3000/users/revise',login)
                                        .toPromise().then(result=>{
                                        if(result.json().result){
                                            this.as.showAlert('提示','您的密码已成功修改！',['知道了']);
                                        }else{
                                            this.as.showAlert('提示','修改失败！！',['确定']);
                                        }
                                    });
                                }
                            }]);
                        // this.as.showAlert('密码已找到','您的密码是：'
                        //     +result.json().result.password,['知道了']);
                    }
                })
            }])
    }

    loginSubmit(login: Login) {
        this.http.post('http://localhost:3000/users/login',login)
            .toPromise().then(result=>{
            if(result.json().result==false){
                this.as.showAlert('登陆结果','登录失败！请检查您的用户名或密码',['确定']);
            }else{      // 如果登录成功，存储个人信息、跳转、（同步个人设置）
                localStorage.currentUser = JSON.stringify(result.json().result);
                // console.log(JSON.parse(localStorage.currentUser));
                this.navCtrl.pop();
            }
        })
    }

}
