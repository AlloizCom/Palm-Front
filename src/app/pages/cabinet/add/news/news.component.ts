import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../../../shared/service/news.service';
import {News} from '../../../../../shared/models/news';
import {NewsDescription} from '../../../../../shared/models/news-description';
import {ImagePipePipe} from '../../../../../shared/pipe/pipe/image.pipe';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ImagePipePipe]
})
export class NewsComponent implements OnInit {

  newsForm: FormGroup;
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
      // console.log(value);
    });

    this.newsForm = new FormGroup({
      TitleEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitleUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitlePl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaPl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textPl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitleRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      multipartFile: new FormControl(null, [this.validateImages]),
      description: new FormControl('', [Validators.minLength(3),Validators.maxLength(255), Validators.required]),
      keywords: new FormControl('', [Validators.minLength(3),Validators.maxLength(255), Validators.required]),
    });
    this.newsForm.valueChanges.subscribe(value => {
      this.news.newsDescriptions[0].language = 'EN';
      this.news.newsDescriptions[0].title = value.TitleEn;
      this.news.newsDescriptions[0].headerText = value.HeaderTextareaEn;
      this.news.newsDescriptions[0].mainText = value.textEn;
      this.news.newsDescriptions[1].language = 'PL';
      this.news.newsDescriptions[1].title = value.TitlePl;
      this.news.newsDescriptions[1].headerText = value.HeaderTextareaPl;
      this.news.newsDescriptions[1].mainText = value.textPl;
      this.news.newsDescriptions[2].language = 'UK';
      this.news.newsDescriptions[2].title = value.TitleUk;
      this.news.newsDescriptions[2].headerText = value.HeaderTextareaUk;
      this.news.newsDescriptions[2].mainText = value.textUk;
      this.news.newsDescriptions[3].language = 'RU';
      this.news.newsDescriptions[3].title = value.TitleRu;
      this.news.newsDescriptions[3].headerText = value.HeaderTextareaRu;
      this.news.newsDescriptions[3].mainText = value.textRu;
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

  addNews(form: HTMLFormElement) {
    this._newsService.save(this.news, form).subscribe(next => {
      // console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      this.img = null;
      form.reset();
      this.getNews();
      alert("Новину добавлено")

    });
    // console.log(this.news)
  }

  getNews() {
    this._newsService.findAll().subscribe(value => {
      this.allNews = value;
    });
  }

  update(form: HTMLFormElement, index) {
    // console.log(this.allNews[index]);
    this._newsService.update(this.allNews[index], form).subscribe(next => {
      this.allNews[index] = this.allNews[index];
      // console.log(next);
      this.allNews[index].picturePath = this._imagePipe.transform(next.picturePath);
    }, error => {
      console.log(error);
    });
  }

  deleteNews(index) {
    this._newsService.delete(index).subscribe(next => {
        // console.log(next);
        this.getNews();
      },
      error =>
        console.log(error)
    );
  }

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {"required": true} : null;
  }
}
