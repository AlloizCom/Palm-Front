import {Room} from "./room";
import {AmenityName} from "./amenity-name";

export class Amenity {

  id: number;
  available: boolean;
  imagePath: string;
  room: Room;
  amenityNames: AmenityName [] = [];

}
