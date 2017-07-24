import {Component} from '@angular/core';

import {NewsPage} from '../news/news';
import {VideoPage} from '../video/video';
import {HomePage} from '../home/home';
import {MinePage} from "../mine/mine";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = VideoPage;
  tab4Root = MinePage;

  constructor() {

  }
}
