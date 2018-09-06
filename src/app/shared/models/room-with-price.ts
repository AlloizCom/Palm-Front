import {Image} from "./image";
import {Amenity} from "./amenity";
import {RoomDescription} from "./room-description";

export class RoomWithPrice {
  id: number;
  available: boolean;
  type: string;
  adultPlaces: number;
  kidsPlaces: number
  square: number
  amount: number;
  descriptions: RoomDescription[] = [];
  amenities: Amenity[] = [];
  images: Image[] = [];
  price: number;
}
