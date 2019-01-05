import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../../../shared/service/news.service';
import {News} from '../../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {ImagePipePipe} from '../../../../shared/pipe/pipe/image.pipe';
import {isNullOrUndefined} from 'util';
import {LangSort} from '../../../../shared/models/utils/lang-sort';
import {SeoService} from '../../../../shared/service/seo.service';
import {CurrentLanguageService} from '../../../../shared/service/current-language.service';

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
    private _meta: SeoService,
    private _currentLanguageService: CurrentLanguageService
  ) {
    // this.lang = this._translate.currentLanguage;
    // this._translate.onLangChange.subscribe(next=>{
    //   this.lang = next.lang;
    // });
    _router.params.subscribe(next => {
      _newsService.findOneAvailable(next['id']).subscribe(next => {
        this.news = next;
        this.news.newsDescriptions = LangSort.sort(this.news.newsDescriptions);
        this.id = next.id;
        this.img = this._imagePipe.transform(next.picturePath);
        this.getMeta(this.news);
        this._currentLanguageService.currentLanguage$.subscribe(value => {
          this.getMeta(this.news);
        });
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

  private getMeta(next) {
    let seo = next.seos.find(value => value.language.toLowerCase() == this._currentLanguageService.currentLanguage.toLowerCase());
    this._meta.currentDescription = seo.description;
    this._meta.currentKeywords = seo.keywords;
  }

}
