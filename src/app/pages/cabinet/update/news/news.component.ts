import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../../shared/service/news.service';
import {News} from '../../../../shared/models/news';
import {Service} from "../../../../shared/models/service";
import {ServiceService} from "../../../../shared/service/service.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers:[NewsService]
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  constructor(private _newsService: NewsService) {
    _newsService.findAll().subscribe(next => {
        this.news = next;
        console.log(this.news)
      }
    ), error => {
      console.log(error)
    }
  }

  ngOnInit() {
  }

  // deleteNews(i){
  //   this._newsService.delete(this.allNews[i].id).subscribe(next =>{
  //     error=>{
  //       console.log(error);
  //     }
  //     this._newsService.findAll().subscribe(value => {
  //       this.allNews = value;
  //       console.log(value);
  //     });
  //   })
  //
  // }

}
