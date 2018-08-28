import {Component, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../../shared/service/news.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  randomIndex:number[]=[];

  constructor(private _newsService: NewsService) {
    this._newsService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != 'undefined' && i != null) {
          this.news.push(i);
        }
      }

      this.news = next;
      console.log(this.news);
    }, err => {
      console.log(err);
    });

    this._newsService.getRandomArray(6).subscribe(value => {
      for (let i of value){
        // console.log(i)
        if (typeof (i) != undefined && i != null) {
          // console.log(i)
          this.randomIndex.push(i);
        }
      }
      console.log(this.randomIndex)
      this.randomIndex = value;
    }, err =>{
      console.log(err);
    });
    console.log(this.randomIndex);

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
