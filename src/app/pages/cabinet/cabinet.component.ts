import { Component, OnInit } from '@angular/core';
import {TranslateService} from "ng2-translate";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {NotificationService} from "../../../shared/service/notification.service";
@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
})
export class CabinetComponent implements OnInit {
  isIn = true;
  notifications : number ;

  private serverUrl = 'http://alloiz.hopto.org:8080/socket';
  private  stompClient;

  constructor(private _translate:TranslateService,
              private _notificationService: NotificationService) {
    this._translate.use('uk');
    this.initializeWebSocketConnection();
    this._notificationService.getCount().subscribe(next=>{
      this.notifications = next.numberOfBooking;
    })
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, frame => {
      that.stompClient.subscribe("/booking/not", (message) => {
        console.log(message.body);
        if(message.body) {
          console.log(JSON.parse(message.body).numberOfBooking);
          this.notifications = JSON.parse(message.body).numberOfBooking;
          console.log(message.body);
        }
      });
    });

  }
  ngOnInit() {
  }
  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}
