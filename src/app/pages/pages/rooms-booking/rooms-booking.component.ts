import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImagePipePipe} from "../../../shared/pipe/pipe/image.pipe";
import {News} from "../../../shared/models/news";
import {NewsService} from "../../../shared/service/news.service";
import {RoomService} from "../../../shared/service/room.service";
import {Room} from "../../../shared/models/room";
import {RoomTariff} from "../../../shared/enum/room-tariff";
import {TariffService} from "../../../shared/service/tariff.service";
import {RoomWithPrice} from "../../../shared/models/room-with-price";
import {isNullOrUndefined} from "util";
import {MainPage} from "../../../shared/models/main-page";
import {Image} from "../../../shared/models/image";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
  providers: [RoomService, NgbCarouselConfig]
})
export class RoomsBookingComponent implements OnInit {

  id: number;
  img: string = '';
  roomTariff: any;
  room: Room;
  images: Image[] = [];

  constructor(private _router: ActivatedRoute, config: NgbCarouselConfig, private _roomService: RoomService) {
    _router.params.subscribe(next => {
      _roomService.findOneAvailableWithPrice(next['id']).subscribe(next => {
        this.roomTariff = RoomTariff;
        this.room = next;
        this.id = next['id'];
        console.log(this.room)
        console.log(next);
      })
    }, err => {
      console.log(err);
    });
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  ngOnInit() {
  }

}
