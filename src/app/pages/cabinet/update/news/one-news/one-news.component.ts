import {Component, OnInit} from '@angular/core';
import {News} from '../../../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NewsService} from '../../../../../shared/service/news.service';
import {ImagePipePipe} from '../../../../../shared/pipe/pipe/image.pipe';

@Component({
  selector: 'app-one-news',
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css'],
  providers: [ImagePipePipe]
})
export class OneNewsComponent implements OnInit {
  newsUpdateForm: FormGroup;
  news: News = new News();
  img: string = '';
  descriptions: FormArray;

  constructor(private _router: ActivatedRoute, private _newsService: NewsService, private _imagePipe: ImagePipePipe) {
  }


  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
    // this.newsDescriptionForm = new FormArray([
    //
    // ]);

    this._router.params.subscribe(next => {
      this.descriptions = new FormArray([
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
      ]);

      this.newsUpdateForm = new FormGroup({
        id: new FormControl(),
        newsDescriptions: this.descriptions,
        available: new FormControl(null),
        dateTime: new FormControl(''),
        picturePath: new FormControl('')
        // multipartFile:new FormControl('',Validators.required),
      });
      this.newsUpdateForm.valueChanges.subscribe(next => {
        this.news = next;
        console.log('Value ', next)
      });
      this._newsService.findOne(next['id']).subscribe(next => {
        console.log(next);
        this.news = next;
        this.newsUpdateForm.patchValue(<any>next);
      }, err => {
        console.error(err);
      });
    })

  }

  update(form) {
    console.log(this.news);
    this._newsService.update(this.news, form).subscribe(next => {
      this.news = next;
      this.newsUpdateForm.patchValue(<any>next);
    }, error => {
      console.log(error);
    })
  }

  private getFormGroupDescription() {
    return new FormGroup({
      language: new FormControl(''),
      title: new FormControl('', Validators.required),
      headerText: new FormControl('', Validators.required),
      mainText: new FormControl('', Validators.required),
      id:new FormControl(),
      available:new FormControl()
    });
  }

}
