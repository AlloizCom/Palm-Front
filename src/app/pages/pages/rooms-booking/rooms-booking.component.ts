import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImagePipePipe} from "../../../shared/pipe/pipe/image.pipe";
import {News} from "../../../shared/models/news";
import {NewsService} from "../../../shared/service/news.service";
import {RoomService} from "../../../shared/service/room.service";
import {Room} from "../../../shared/models/room";
import {RoomTariff} from "../../../shared/enum/room-tariff";
import {TariffService} from "../../../shared/service/tariff.service";
import {RoomWithPrice} from "../../../shared/models/room-with-price";

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
  providers:[RoomService]
})
export class RoomsBookingComponent implements OnInit {

  id: number;
  img: string = '';
  roomTariff: any;
  room: Room;

  constructor(private _router: ActivatedRoute, private _roomService: RoomService) {
    _router.params.subscribe(next => {
      _roomService.findOneAvailableWithPrice(next['id']).subscribe(next => {
        this.roomTariff = RoomTariff;
        this.room = next;
        this.id = next['id'];
        console.log(this.room)
        console.log(next);
      })
    })
  }

  ngOnInit() {
  }

}
