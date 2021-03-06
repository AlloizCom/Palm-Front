import {RoomType} from '../room-type';
import {Description} from './description';

export class Room {
  roomType: RoomType;
  name: string;
  roomNumber: number;
  additionalPlaces: number;
  descriptions: Description[];
  price:number;
}
