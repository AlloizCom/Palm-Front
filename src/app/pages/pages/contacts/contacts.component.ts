import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Callback} from '../../../../shared/models/callback';
import {CallbackService} from '../../../../shared/service/callback.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {


  latitude = 49.856338332302016;
  longitude = 24.076377153396606;
  defaultLatitude = 49.843645;
  defaultLongitude = 24.026503;
  callbackForm: FormGroup;
  callback: Callback = new Callback();
  currentWay: any = "";
  public lat = 24.799448;
  public lng = 120.979021;
  public destination = {lat: 49.856338332302016, lng: 24.076377153396606};
  public origin = {lat: this.defaultLatitude, lng: this.defaultLongitude};


  constructor(private  _callback: CallbackService) {
  }

  changeWay(way: string) {
    this.currentWay = `contacts-way-${way}`;
  }

  ngOnInit() {
    this.callbackForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.pattern(/\d{6,12}/)])
    });
    this.callbackForm.valueChanges.subscribe(value => {
      this.callback = value;
    });
  }

  sendMessage() {
    this._callback.save(this.callback).subscribe(next => {
        // console.log(next);
        // console.log(this.callback);
      },
      error => {
        console.log(error);
        // console.log(this.callback);
      }, () => {
        this.callbackForm.reset();
      }
    );
  }

  getAirportDirection() {
    this.destination = {lat: 49.856338332302016, lng: 24.076377153396606}
    this.origin = {lat: 49.8134465, lng: 23.9573617}
  }

  getStationDirection() {
    this.destination = {lat: 49.856338332302016, lng: 24.076377153396606}
    this.origin = {lat: 49.8399353, lng: 23.9915774}
  }

  getBusDirection() {
    this.destination = {lat: 49.856338332302016, lng: 24.076377153396606}
    this.origin = {lat: 49.8642614, lng: 24.0491102}
  }

  getSquareDirection() {
    this.destination = {lat: 49.856338332302016, lng: 24.076377153396606}
    this.origin = {lat: 49.8413523, lng: 24.0303229}
  }

  getCastleDirection() {
    this.destination = {lat: 49.856338332302016, lng: 24.076377153396606}
    this.origin = {lat: 49.8514224, lng: 24.0316346}
  }

}
