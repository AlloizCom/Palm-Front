import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../../shared/service/news.service';
import {News} from '../../../../shared/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private _newsService: NewsService) { }
  allNews: News[] = [];
  img: string;
  appear: boolean = false;

  ngOnInit() {
    this._newsService.findAll().subscribe(value => {
      this.allNews = value;
      console.log(value);
    });
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

}
