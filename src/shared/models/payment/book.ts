import {Client} from './client';
import {Room} from './room';
import {Status} from './status';

export class Book {
  client: Client;
  status: Status;
  rooms: Room[] = [];
  dateFrom: string;
  dateTo: string;
  bookingDate: string;
  boughtOnLine: boolean;
  totalPrice: number;
  payedPrice: number;
  isCash: boolean;
}
