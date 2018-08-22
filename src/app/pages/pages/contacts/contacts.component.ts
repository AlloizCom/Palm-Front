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

  airportWay: any = "";

  changeWay(way:string){
    this.airportWay=`contacts-way-${way}`;
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
