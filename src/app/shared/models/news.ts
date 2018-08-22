import {NewsDescription} from "./news-description";

export class News {

  id: number;
  available: boolean;
  dateTime: string;
  picturePath: string;
  newsDescriptions: NewsDescription[] = [];

}
