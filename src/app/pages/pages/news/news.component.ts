import {Component, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../../shared/service/news.service';
import {isNullOrUndefined} from 'util';
import {NewsByPage} from '../../../shared/models/news-by-page';
import {NewsDescription} from "../../../shared/models/news-description";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  news3: News[] = [];
  nuberOfNews: number = 6;
  page: number = 0;
  lang = 'uk';
  description = new NewsDescription();


  constructor(private _newsService: NewsService,private _translate:TranslateService) {
    // this.lang = this._translate.currentLang;
    // this._translate.onLangChange.subscribe(next=>{
    //   this.lang = next.lang;
    // });
    this._newsService.getRandomNews(6).subscribe(next => {
      this.news = next;
      console.log('news', this.news);
    }, err => {
      console.log(err);
    });
    this._newsService.findAllAvailableNewsByPage(
      this.page, this.nuberOfNews).subscribe(next => {
      next.news.reverse().forEach(data => this.news3.push(data));
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    console.log(this.news3);
  }

  showMore() {
    this.page++;
    this._newsService.findAllAvailableNewsByPage(
      this.page, this.nuberOfNews).subscribe(next => {
      next.news.reverse().forEach(data => this.news3.push(data));
    }, err => {
      console.log(err);
    });
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }
}
