import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';

const description = 'description';
const defaultDescription = '"Пальма" маленький арт-готель з вишуканим та оригінальним дизайном за доступними цінами. Затишно, недорого, система знижок та спецпропозицій.';
const keywords = 'keywords';
const defaultKeywords = 'Пальма готель, готелі Львова, отели,екскурсії, спеціальні пропозиції, гостиницы, Hotel, Hotels, Різдво, Рождество, Новий рік Львів, Новорічна вечеря, Новий рік у Львові, New Year, Новый год, palmahotel,Palma ,accommodation, prices, ціни, цены, ceny,tourism, journey,travel,Ukraine,hotels,Lviv,L\'viv,Lvov,Львiв,Львов,Lwow,Україна,Украина,готель,туризм,подорож,путешествие,turystyka';
const content = 'content';

@Injectable()
export class SeoService {

  constructor(private _meta: Meta) {
    if (!_meta.getTag(description)) {
      _meta.addTag({name: description, content: defaultDescription});
    }
    if (!_meta.getTag(keywords)) {
      _meta.addTag({name: keywords, content: defaultKeywords});
    }
  }

  get currentKeywords(): string {
    return this._meta.getTag(keywords).getAttribute(content);
  }

  set currentKeywords(val: string) {
    this._meta.updateTag({name: keywords, content: val});
  }

  get currentDescription(): string {
    return this._meta.getTag(description).getAttribute(content);
  }

  set currentDescription(value: string) {
    this._meta.updateTag({name: description, content: value});
  }

  setDefault() {
    this.currentDescription = defaultDescription;
    this.currentKeywords = defaultKeywords;
  }

}
