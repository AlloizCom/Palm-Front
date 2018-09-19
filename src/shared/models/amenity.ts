import {AmenityName} from './amenity-name';

export class Amenity {

  id: number;
  available: boolean;
  imagePath: string;
  amenityNames: AmenityName [] = [];

}
