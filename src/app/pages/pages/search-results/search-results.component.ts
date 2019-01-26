import {Component, OnInit} from '@angular/core';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {Room as PaymentRoom} from '../../../../shared/models/payment/room';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {Language} from '../../../../shared/models/payment/language';
import {CurrentLanguageService} from '../../../../shared/service/current-language.service';
import {Book} from '../../../../shared/models/payment/book';
import {BinService} from '../../../../shared/service/payment/bin.service';
import {RoomService as PaymentRoomService} from '../../../../shared/service/payment/room.service';
import {RoomService} from '../../../../shared/service/room.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [RoomService]
})
export class SearchResultsComponent implements OnInit {

  rooms: PaymentRoom[] = [];
  roomsParams: RoomsParams;
  book: Book = new Book();

  // roomTariff = Roo

  constructor(
    private _roomService: RoomService,
    private _paymentRoomService: PaymentRoomService,
    private _roomParamsService: RoomParamsService,
    private _currentLanguageService: CurrentLanguageService,
    private _binService: BinService
  ) {
    // this._roomService.search(this._roomParamsService.params).subscribe(val=>{
    //   console.log(val);
    // },err=>{console.error(err);})
    // this.book = _binService.bin;
    this.roomsParams = this._roomParamsService.params;
    _paymentRoomService.findAllByType(_roomParamsService.params.roomType).subscribe(value => this.rooms = value);
    // this.dummy();
  }

  ngOnInit() {
  }

  dummy() {
    let langs: Language[] = [
      {languagesName: 'UK'},
      {languagesName: 'EN'},
      {languagesName: 'DE'}
    ];
    for (let i = 0; i < 10; i++) {
      let room: PaymentRoom = new PaymentRoom();
      room = {
        additionalPlaces: Math.ceil(Math.random() * (this.roomsParams.adults + this.roomsParams.childrens - 1) + 1),
        name: `${i} name ${i}`,
        roomNumber: i,
        roomType: this.roomsParams.roomType,
        descriptions: langs.map(value => {
          return {
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, cum cupiditate eveniet expedita hic id minus modi molestias non omnis sint tempore ullam veritatis voluptate voluptates! Deleniti dolor laborum repellat.',
            language: value
          };
        }),
        price: Math.floor(Math.random() * 900)
      };
      this.rooms.push(room);
    }
  }

  addRoom(room: PaymentRoom) {
    this.book.rooms.push(room);
    this._binService.bin = this.book;
  }

  removeRoom(room: PaymentRoom) {
    this.book.rooms = this.book.rooms.filter(value => value != room);
    this._binService.bin = this.book;
  }

  getDescription(room: PaymentRoom) {
    return room.descriptions.find(value => value.language.languagesName.toLowerCase() == this._currentLanguageService.currentLanguage.toLowerCase()).text;
  }
}
