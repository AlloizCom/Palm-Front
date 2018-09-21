import {Component, OnInit} from '@angular/core';
import {Callback} from '../../../../shared/models/callback';
import {CallbackService} from '../../../../shared/service/callback.service';
import {CallbackCounterService} from "../../../../shared/service/callback-counter.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  callback: Callback[] = [];
  page: number = 0;
  numberOfItems: number = 5;

  constructor(private  _callbackService: CallbackService,
              private _callbackCounterService: CallbackCounterService) {
    _callbackCounterService.resetCounter().subscribe(next => {
    }, err => {
      console.log(err);
    });

    this._callbackService.findAllAvailableCallbacksByPage(this.page, this.numberOfItems).subscribe(next => {
      for (let one of next.callbacks) {
        this.callback.push(one);
      }
      // console.log("treba",this.callback);
    });
  }

  ngOnInit() {

  }

  changStatus(i) {
    this.callback[i].available = !this.callback[i].available;
    this._callbackService.update(this.callback[i]).subscribe(next => {
      // console.log(next);
      // console.log(this.callbacks[i]);
    });
  }

  showMore() {
    this.page++;
    this._callbackService.findAllAvailableCallbacksByPage(this.page, this.numberOfItems).subscribe(next => {
        for (let one of next.callbacks) {
          this.callback.push(one);
        }
        // console.log("showmore",this.callback)
      }, err => {
        console.log(err)
      }
    );
  }

}
