import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { buildCookie, parseCookie } from './cookie.helper';
import { ICookieOptions } from './__types__/ICookieOptions';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  get(name: string) {
    return this.getAll()[name];
  }

  set(name: string, value: string, options: ICookieOptions = {}) {
    this.document.cookie = buildCookie(name, value, options);
  }

  getAll(): { [key: string]: string } {
    return parseCookie(this.document.cookie);
  }
}
