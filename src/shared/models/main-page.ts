import {Image} from "./image";
import {SeoModel} from './seo-model';

export class MainPage {

  public id: number;
  public available: boolean;
  public images: Image[] = [];
  seos:SeoModel[];
}
