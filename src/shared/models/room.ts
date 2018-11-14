import {RoomDescription} from "./room-description";
import {Amenity} from "./amenity";
import {Image} from "./image";

export class Room {

  id: number;
  available: boolean;
  type: string;
  adultPlaces: number;
  kidsPlaces: number;
  square: number;
  amount: number;
  descriptions: RoomDescription[] = [];
  amenities: Amenity[] = [];
  images: Image[] = [];
  price: number;

}
