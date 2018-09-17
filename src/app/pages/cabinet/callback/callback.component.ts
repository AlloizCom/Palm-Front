import { Component, OnInit } from '@angular/core';
import {Callback} from '../../../shared/models/callback';
import {CallbackService} from '../../../shared/service/callback.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  callbacks: Callback[] = [];

  constructor(private  _callback: CallbackService) { }

  ngOnInit() {
    this._callback.findAll().subscribe(next => {
      this.callbacks = next;
    });
  }
  changStatus(i){
    this.callbacks[i].available = ! this.callbacks[i].available;
    this._callback.update(this.callbacks[i]).subscribe(next => {
      console.log(next);
      console.log(this.callbacks[i]);
    });
  }

}
