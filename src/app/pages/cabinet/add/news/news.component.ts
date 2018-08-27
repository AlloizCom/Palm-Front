import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../../shared/service/news.service';
import {News} from '../../../../shared/models/news';
import {NewsDescription} from '../../../../shared/models/news-description';
import {ImagePipePipe} from '../../../../shared/pipe/pipe/image.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ImagePipePipe]
})
export class NewsComponent implements OnInit {

  news: News = new News();
  description: NewsDescription[] = [];
  allNews: News[] = [];
  img: string;
  appear: boolean = false;


  constructor(private _newsService: NewsService, private _imagePipe: ImagePipePipe) {
    this.description = [new NewsDescription(), new NewsDescription(), new NewsDescription(), new NewsDescription()];
    this.news.newsDescriptions = this.description;
  }

  ngOnInit() {
    this._newsService.findAll().subscribe(value => {
      this.allNews = value;
      console.log(value);
    });
  }

  addDescr(title: string, header: string, text: string, index: number) {
    switch (index) {
      case 0: {
        this.news.newsDescriptions[index].language = 'EN';
        this.news.newsDescriptions[index].title = title;
        this.news.newsDescriptions[index].headerText = header;
        this.news.newsDescriptions[index].mainText = text;
        break;
      }
      case 1: {
        this.news.newsDescriptions[index].language = 'UK';
        this.news.newsDescriptions[index].title = title;
        this.news.newsDescriptions[index].headerText = header;
        this.news.newsDescriptions[index].mainText = text;
        break;
      }
      case 2: {
        this.news.newsDescriptions[index].language = 'PL';
        this.news.newsDescriptions[index].title = title;
        this.news.newsDescriptions[index].headerText = header;
        this.news.newsDescriptions[index].mainText = text;
        break;
      }
      case 3: {
        this.news.newsDescriptions[index].language = 'RU';
        this.news.newsDescriptions[index].title = title;
        this.news.newsDescriptions[index].headerText = header;
        this.news.newsDescriptions[index].mainText = text;
        break;
      }
    }
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

  addNews(form: HTMLFormElement) {
    this._newsService.save(this.news, form).subscribe(next => {
      console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      this.img = null;
      form.reset();
      this.getNews();
    });
    console.log(this.news)
  }

  getNews() {
    this._newsService.findAll().subscribe(value => {
      this.allNews = value;
      console.log(value);
    });
  }

  update(form: HTMLFormElement, index) {
    console.log(this.allNews[index]);
    this._newsService.update(this.allNews[index], form).subscribe(next => {
      this.allNews[index] = this.allNews[index];
      console.log(next);
      this.allNews[index].picturePath = this._imagePipe.transform(next.picturePath);
    }, error => {
      console.log(error);
    });
  }

  deleteNews(index){
    this._newsService.delete(index);
  }

}
