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
import {HttpModule} from "@angular/http";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {AgreementPage} from "../pages/agreement/agreement";
import {NewsService} from "./news.service";
import {DetailPage} from "../pages/detail/detail";
import {ListPage} from "../pages/list/list";
import {VideoDetailPage} from "../pages/video-detail/video-detail";

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
    AgreementPage,
    DetailPage,
    ListPage,
    VideoDetailPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'
    }),
    HttpModule,
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
    AgreementPage,
    DetailPage,
    ListPage,
    VideoDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NewsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
