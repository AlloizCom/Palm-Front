import {Component, OnInit} from '@angular/core';
import {News} from '../../../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../../../shared/service/news.service';
import {ImagePipePipe} from '../../../../../shared/pipe/pipe/image.pipe';
import {NewsDescription} from '../../../../../shared/models/news-description';

@Component({
  selector: 'app-one-news',
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css'],
  providers: [ImagePipePipe]
})
export class OneNewsComponent implements OnInit {

  news: News = new News();
  img: string = '';
  id: number;

  constructor(private _router: ActivatedRoute, private _newsService: NewsService, private _imagePipe: ImagePipePipe) {
    this.news.newsDescriptions = [];
    let descr = new NewsDescription();
    descr.title = '';
    for (let i = 0; i < 4; i++)
      this.news.newsDescriptions.push(descr);
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

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img= event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
  }

  update(form){
    console.log(this.news);
    this._newsService.update(this.news,form).subscribe(next=>{
      this.news=next;

      this.img=this._imagePipe.transform(next.picturePath);
    },error=>{
      console.log(error);
    })
  }

  deleteNews(){
    console.log(this.id);
    this._newsService.delete(this.id).subscribe(next =>{

      error=>{
        console.log(error);
      }
    })
  }
}
