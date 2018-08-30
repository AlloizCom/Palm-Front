import {Component, OnInit} from '@angular/core';
import {MainPage} from "../../../shared/models/main-page";
import {MenuComponent} from "../menu/menu.component";
import {isNullOrUndefined} from "util";
import {News} from "../../../shared/models/news";
import {NewsService} from "../../../shared/service/news.service";
import {MainPageSevice} from "../../../shared/service/main-page.sevice";
import {Image} from "../../../shared/models/image";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[MainPageSevice]
})
export class MainComponent implements OnInit{



  mainPage: MainPage [] = [];
  Images: Image[]=[];
  middleIndex:number;
  allPathes: string [] = [];

  constructor(private _mainPageService: MainPageSevice) {

    this._mainPageService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != 'undefined' && i != null) {
          this.mainPage.push(i);
        }
      }
      this.mainPage = next;
        for(let i = 0;i<this.mainPage.length;i++){
          for (let j = 0; j<this.mainPage[i].images.length; j++){
            this.Images = this.mainPage[i].images;
            this.allPathes.push(this.mainPage[i].images[j].path);
          }
          // this.Images.push(this.mainPage[i].images[i].path)
        }
        console.log(this.allPathes);
      // console.log(this.Images);
      this.middleIndex = Math.round(this.Images.length / 2);
      console.log(this.middleIndex)

    }, err => {
      console.log(err);
    });
  }

  scroll(event) {
    if (this.middleIndex > 0 && this.middleIndex != this.allPathes.length - 1) {
      event ? this.middleIndex -= 1 : this.middleIndex += 1;
    } else if (this.middleIndex == 0 && event == false) {
      this.middleIndex += 1
    } else if (this.middleIndex == this.allPathes.length - 1 && event == true) {
      this.middleIndex -= 1
    } else if (this.middleIndex == this.allPathes.length - 1 && event == false) {
      this.middleIndex = 0;
    } else if (this.middleIndex == 0 && event == true) {
      this.middleIndex = this.allPathes.length - 1;
    }
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }



  //grey map
iconUrl:'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';

  latitude =  49.856338332302016;
  longitude =24.076377153396606;

  public customStyle = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e9e9e9"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    }
  ];


  onChoseLocation(event){
    console.log(event)
  }


  //dataPicker
  model1: Date;
  model2: Date;
  enterDay;
  leaveDay;
  month: string[] =[
    'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень','липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'
  ]

  //available
  adultsNumber: number = 1;
  childrenNumber: number = 1;
  roomsNumber: number = 1;


  ngOnInit() {

  }



  //data picker
  get today() {
    return new Date();
  }
  chang1(e){
    this.enterDay = e;
    console.log(e);
  }
  chang2(e){
    this.leaveDay = e;
    console.log(e);
  }

  //dataPicker
  roomsNumberFunc(bull){
    console.log("work")
    if(bull){
      this.roomsNumber+=1;
    }
    if(!bull && this.roomsNumber!=1){
      this.roomsNumber-=1;
    }
  }
  adultsNumberFunc(bull){
    console.log("work")
    if(bull){
      this.adultsNumber+=1;
    }
    if(!bull && this.adultsNumber!=1){
      this.adultsNumber-=1;
    }
  }
  childrenNumberFunc(bull){
    console.log("work")
    if(bull){
      this.childrenNumber+=1;
    }
    if(!bull && this.childrenNumber!=1){
      this.childrenNumber-=1;
    }
  }

}
