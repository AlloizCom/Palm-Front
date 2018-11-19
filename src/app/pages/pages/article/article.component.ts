import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../../../shared/service/news.service';
import {News} from '../../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {ImagePipePipe} from '../../../../shared/pipe/pipe/image.pipe';
import {isNullOrUndefined} from 'util';
import {LangSort} from '../../../../shared/models/utils/lang-sort';
import {SeoService} from '../../../../shared/service/seo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ImagePipePipe]
})
export class ArticleComponent implements OnInit, OnDestroy {

  news: News;
  id: number;
  img: string = '';

  constructor(
    private _newsService: NewsService,
    private _router: ActivatedRoute,
    private _imagePipe: ImagePipePipe,
    private _meta: SeoService
  ) {
    // this.lang = this._translate.currentLang;
    // this._translate.onLangChange.subscribe(next=>{
    //   this.lang = next.lang;
    // });
    _router.params.subscribe(next => {
      _newsService.findOneAvailable(next['id']).subscribe(next => {
        this.news = next;
        this.news.newsDescriptions = LangSort.sort(this.news.newsDescriptions);
        this.id = next.id;
        this.img = this._imagePipe.transform(next.picturePath);
        this._meta.currentDescription = next.description;
        this._meta.currentKeywords = next.keywords;
      }, error => {
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

  ngOnDestroy(): void {
    this._meta.setDefault();
  }
}
