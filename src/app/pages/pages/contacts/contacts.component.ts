import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

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


  constructor() {

    console.log("hello");

    function myFunction() {
      document.getElementById('airportWay').style.display='none';
    };
    console.log(document.getElementById('airportWay'));
    // console.log(document.getElementById('airportWay').style);
    // console.log(document.getElementById('airportWay').style.display);
    // function addText(){
    //   this.someText="dlvknsdkjgnsjdfgn;dsfng;ksdfng;dsfng;ksdfng";
    // }

  }


  ngOnInit() {

  }

}
