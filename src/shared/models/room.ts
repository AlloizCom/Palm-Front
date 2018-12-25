import {RoomDescription} from './room-description';
import {Amenity} from './amenity';
import {Image} from './image';
import {SeoModel} from './seo-model';

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
  seos: SeoModel[];
  priceThreePlaces: number;
  priceFifthPlaces: number;

}
