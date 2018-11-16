import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';

const description = 'description';
const defaultDescription = 'Art-Hotel Palma';
const keywords = 'keywords';
const defaultKeywords = 'Art-Hotel, Art-Hotel Palma, Palma';
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
