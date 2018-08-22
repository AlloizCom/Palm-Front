import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Callback} from '../../../shared/models/callback';
import {CallbackService} from '../../../shared/service/callback.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  //formcontroll

  latitude =  49.856338332302016;
  longitude =24.076377153396606;


    onChoseLocation(event){
      console.log(event)
    }
  callbackForm: FormGroup;
  callback: Callback = new Callback();

  airportWay: string = "";
  stationWay: string = "";
  busWay: string = "";
  squareWay: string = "";
  castleWay: string = "";

  airportClick(){
    // document.querySelector("body").style.cssText = "--my-var: red";
    this.airportWay='airportWay';
    this.stationWay = '';
    this.busWay = '';
    this.squareWay = '';
    this.castleWay = '';
  }
  stationClick(){
    this.airportWay='';
    this.stationWay = 'stationWay';
    this.busWay = '';
    this.squareWay = '';
    this.castleWay = '';
  }
  busClick(){
    this.airportWay='';
    this.stationWay = '';
    this.busWay = 'busWay';
    this.squareWay = '';
    this.castleWay = '';
  }
  squareClick(){
    this.airportWay='';
    this.stationWay = '';
    this.busWay = '';
    this.squareWay = 'squareWay';
    this.castleWay = '';
  }
  castleClick(){
    this.airportWay='';
    this.stationWay = '';
    this.busWay = '';
    this.squareWay = '';
    this.castleWay = 'castleWay';
  }


  constructor(private  _callback: CallbackService) {
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
        console.log(next);
        console.log(this.callback);
      },
      error => {
        console.log(error);
        console.log(this.callback);
      }, () => {
        this.callbackForm.reset();
      }
    );
  }
}
