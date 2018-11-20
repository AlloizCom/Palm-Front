import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../../../shared/service/news.service';
import {NewsDescription} from '../../../../../shared/models/news-description';
import {ImagePipePipe} from '../../../../../shared/pipe/pipe/image.pipe';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

const languages = ['EN', 'PL', 'UK', 'RU'];

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ImagePipePipe]
})
export class NewsComponent implements OnInit {

  newsForm: FormGroup;
  img: string;
  appear: boolean = false;

  constructor(private _newsService: NewsService) {
  }

  ngOnInit() {
    let formArray = [];
    for (let one of languages) {
      formArray.push(new FormGroup({
        language: new FormControl(one),
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        headerText: new FormControl('', [Validators.required, Validators.minLength(3)]),
        mainText: new FormControl('', [Validators.required, Validators.minLength(3)])
      }));
    }
    this.newsForm = new FormGroup({
      newsDescriptions: new FormArray(formArray),
      multipartFile: new FormControl(null, [this.validateImages]),
      description: new FormControl('', [Validators.minLength(3), Validators.maxLength(255), Validators.required]),
      keywords: new FormControl('', [Validators.minLength(3), Validators.maxLength(255), Validators.required]),
    });
  }

  get descriptionForms(){
    return (<FormArray>this.newsForm.get('newsDescriptions')).controls;
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
    console.log(this.newsForm.getRawValue());
    this._newsService.save(this.newsForm.getRawValue(), form).subscribe(next => {
      this.img = null;
      form.reset();
      alert('Новину добавлено');
    }, error => {
      alert('Новину не добавлено');
      console.log(error);
    });
  }

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {'required': true} : null;
  }
}
