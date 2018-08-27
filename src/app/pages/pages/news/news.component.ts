import {Component, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../../shared/service/news.service';
import {isNullOrUndefined} from 'util';
import {TranslateLoader, TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  language: string;

  constructor(private _newsService: NewsService, private translate: TranslateService) {
    this._newsService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != 'undefined' && i != null) {
          this.news.push(i);
        }

      }

      this.news = next;
      this.language = this.translate.currentLang;
      console.log('current lang - ' + this.translate.currentLang);
      console.log('langs - ' + this.translate.getLangs());
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }
}
