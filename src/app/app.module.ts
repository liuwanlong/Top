import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {NewsPage} from '../pages/news/news';
import {VideoPage} from '../pages/video/video';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MinePage} from "../pages/mine/mine";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {AgreementPage} from "../pages/agreement/agreement";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    VideoPage,
    HomePage,
    TabsPage,
    MinePage,
    RegisterPage,
    LoginPage,
    AgreementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    VideoPage,
    HomePage,
    TabsPage,
    MinePage,
    RegisterPage,
    LoginPage,
    AgreementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
