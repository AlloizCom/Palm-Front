import {Component, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../../shared/service/news.service';
import {isNullOrUndefined} from 'util';
import {NewsByPage} from "../../../shared/models/news-by-page";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  news2:NewsByPage;
  nuberOfNews: number = 6;
  page: number = 0;

  constructor(private _newsService: NewsService) {
    this._newsService.getRandomNews(6).subscribe(next => {
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.news.push(i);
        }
      }
      this.news = next;
      console.log('news',this.news);
    }, err => {
      console.log(err);
    });

    this._newsService.findAllAvailableNewsByPage(
      this.page,this.nuberOfNews).subscribe(next => {

      this.news2 = next;
      console.log('news2',this.news2);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  showMore(){
    this.nuberOfNews += 6;
    this._newsService.findAllAvailableNewsByPage(
      this.page,this.nuberOfNews).subscribe(next => {

      this.news2 = next;
      console.log('news2',this.news2);
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
