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



  latitude =  49.856338332302016;
  longitude =24.076377153396606;


    onChoseLocation(event){
      console.log(event)
    }
  callbackForm: FormGroup;
  callback: Callback = new Callback();

  currentWay: any = "";

  changeWay(way:string){
    this.currentWay=`contacts-way-${way}`;
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
  public lat = 24.799448;
  public lng = 120.979021;
  public origin = { lat: 49.856338332302016, lng: 24.076377153396606 };
  public destination = { lat: 49.8457735, lng: 24.0223995 };

  getAirportDirection() {
    this.origin = { lat: 49.856338332302016, lng: 24.076377153396606 }
    this.destination = { lat: 49.8134465, lng: 23.9573617 }
  }
 getStationDirection() {
    this.origin = { lat: 49.856338332302016, lng: 24.076377153396606 }
    this.destination = { lat:  49.8399353, lng: 23.9915774 }
  }
 getBusDirection() {
    this.origin = { lat: 49.856338332302016, lng: 24.076377153396606 }
    this.destination = { lat:  49.8642614, lng: 24.0491102 }
  }
 getSquareDirection() {
    this.origin = { lat: 49.856338332302016, lng: 24.076377153396606 }
    this.destination = { lat:  49.8413523, lng: 24.0303229 }
  }
 getCastleDirection() {
    this.origin = { lat: 49.856338332302016, lng: 24.076377153396606 }
    this.destination = { lat:  49.8514224, lng: 24.0316346 }
  }


//   mapRoutes(){
//     let directionServices = new google.maps.DirectionsService;
//     let directionDisplay = new google.maps.DirectionsRenderer;
//
//     let map = new google.maps()
// }
//
//
//
}
