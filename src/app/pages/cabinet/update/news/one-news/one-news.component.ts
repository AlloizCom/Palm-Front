import {Component, OnInit} from '@angular/core';
import {News} from '../../../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../../../shared/service/news.service';
import {ImagePipePipe} from '../../../../../shared/pipe/pipe/image.pipe';
import {NewsDescription} from '../../../../../shared/models/news-description';
import {Service} from "../../../../../shared/models/service";
import {ServiceService} from "../../../../../shared/service/service.service";

@Component({
  selector: 'app-one-news',
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css'],
  providers: [ImagePipePipe]
})
export class OneNewsComponent implements OnInit {
  news: News = new News();
  img: string = '';
  appear: boolean = true;

  constructor(private _router: ActivatedRoute, private _newsService: NewsService, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _newsService.findOne(next['id']).subscribe(next => {
        this.news = next;
        console.log(next);
        this.img = this._imagePipe.transform(next.picturePath);
        console.log("tyt1" + this.img)
      })
    })
  }


  readUrl(event: any) {
    this.appear = false;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
        this.appear = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
  }

  update(form) {
    console.log(this.news);
    this._newsService.update(this.news, form).subscribe(next => {
      this.news = next;
    }, error => {
      console.log(error);
    })
  }

}
