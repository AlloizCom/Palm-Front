import {NewsDescription} from './news-description';
import {SeoModel} from './seo-model';

export class News {

  id: number;
  available: boolean;
  dateTime: string;
  picturePath: string;
  newsDescriptions: NewsDescription[] = [];
  seos: SeoModel[];

}
