import {RoomDescription} from "./room-description";
import {Amenity} from "./amenity";
import {Image} from "./image";

export class Room {

  id: number;
  available: boolean;
  roomType: string;
  adultPlaces: number;
  kidsPlaces: number
  square: number
  amount: number;
  descriptions: RoomDescription[] = [];
  anemities: Amenity[] = [];
  images: Image[] = [];

}
