import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {NotificationService} from '../../../shared/service/notification.service';
import {CallbackCounterService} from '../../../shared/service/callback-counter.service';
import {Router} from '@angular/router';
import {UserDetailsService} from '../../../shared/service/user-details.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  providers: [CallbackCounterService]
})
export class CabinetComponent implements OnInit {
  isIn = true;
  bookingNotifications: number;
  callbackNotifications: number;

  private serverUrl = 'http://alloiz.hopto.org:8080/socket';
  private stompClient;

  constructor(private _translate: TranslateService,
              private _notificationService: NotificationService,
              private _callBackCounterService: CallbackCounterService,
              private _router: Router,
              private _userDetailsService: UserDetailsService) {
    this._translate.use('uk');
    this.initializeWebSocketConnection();
    this._notificationService.getCount().subscribe(next => {
      this.bookingNotifications = next.numberOfBooking;
    });
    this._callBackCounterService.getCount().subscribe(next => {
      console.log('callcount - ', next);
      this.callbackNotifications = next.numberOfCallbacks;
    });
  }

  logOut() {
    this._userDetailsService.logout();
    this._router.navigateByUrl('/login');
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, frame => {
      that.stompClient.subscribe('/booking/not', (message) => {
        console.log(message.body);
        if (message.body) {
          console.log(JSON.parse(message.body).numberOfBooking);
          this.bookingNotifications = JSON.parse(message.body).numberOfBooking;
          console.log(message.body);
        }
      });
      that.stompClient.subscribe('/callback/not', (message) => {
        console.log(message.body);
        if (message.body) {
          console.log('callback - ', JSON.parse(message.body).numberOfCallbacks);

          this.callbackNotifications = JSON.parse(message.body).numberOfCallbacks;
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
