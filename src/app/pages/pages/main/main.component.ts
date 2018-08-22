import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  //formcontroll

  // labelOptions = {
  //
  //   backgroundImage:'../../../../assets/svg/MainMarker.svg'
  // }
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

  middleIndex: number;

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

  images = [{
    image:'../../../../assets/png/sld1.jpg'
  }, {
    image:'../../../../assets/png/sld2.jpg'
  },{
    image: '../../../../assets/png/sld3.jpg'
  },{
    image:'../../../../assets/png/Rectangle.png'
  },{
    image:'../../../../assets/png/sld5.jpg'
  }]

  constructor() {
    this.middleIndex = Math.round(this.images.length/2);
  }

  ngOnInit() {

  }

  scroll(event) {
    if (this.middleIndex > 0 && this.middleIndex != this.images.length - 1) {
      event ? this.middleIndex -= 1 : this.middleIndex += 1;
    } else if (this.middleIndex == 0 && event == false) {
      this.middleIndex += 1
    } else if (this.middleIndex == this.images.length - 1 && event == true) {
      this.middleIndex -= 1
    } else if (this.middleIndex == this.images.length - 1 && event == false) {
      this.middleIndex = 0;
    } else if (this.middleIndex == 0 && event == true) {
      this.middleIndex = this.images.length - 1;
    }
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
