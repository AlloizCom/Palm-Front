import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../shared/service/news.service';
import {News} from '../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {ImagePipePipe} from '../../../shared/pipe/pipe/image.pipe';
import {isNullOrUndefined} from "util";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ImagePipePipe]
})
export class ArticleComponent implements OnInit {

  news:News;
  id: number;
  img: string = '';
  lang = 'uk';

  constructor(private _newsService:NewsService, private _router: ActivatedRoute, private _imagePipe: ImagePipePipe,private _translate:TranslateService) {
    // this.lang = this._translate.currentLang;
    // this._translate.onLangChange.subscribe(next=>{
    //   this.lang = next.lang;
    // });
    _router.params.subscribe(next => {
      _newsService.findOneAvailable(next['id']).subscribe(next => {
        this.news = next;
        this.id = next['id'];
        this.img = this._imagePipe.transform(next.picturePath);
      },error=>{
        console.log(error);
      });
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
