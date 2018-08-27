import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../shared/service/news.service';
import {News} from '../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {ImagePipePipe} from '../../../shared/pipe/pipe/image.pipe';

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

  constructor(private _newsService:NewsService, private _router: ActivatedRoute, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _newsService.findOne(next['id']).subscribe(next => {
        this.news = next;
        this.id = next['id'];
        this.img = this._imagePipe.transform(next.picturePath)
      },error=>{
        console.log(error);
      })
    });
  }

  ngOnInit() {
  }

}
