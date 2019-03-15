import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';
import { RuntimeService } from '../runtime/runtime.service';
import { DOCUMENT } from '@angular/common';
import { CookieOptions } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(
    private runtime: RuntimeService,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(REQUEST) private request: Request,
    @Optional() @Inject(RESPONSE) private response: Response
  ) {}

  get(name: string) {
    return this.getAll()[name];
  }

  set(name: string, value: string, options: CookieOptions = {}) {
    this.setRawCookieData(name, value, options);
  }

  getAll(): { [key: string]: string } {
    return this.getRawCookieData()
      .split('; ')
      .filter((rawCookie) => rawCookie.indexOf('=') > 0)
      .map((rawCookie) => {
        const cookieData = rawCookie.split('=');
        const cookieName = decodeURIComponent(cookieData.shift() || '');
        const cookieValue = decodeURIComponent(cookieData.join('='));
        return { name: cookieName, value: cookieValue };
      })
      .reduce((final, item) => ({ ...final, [item.name]: item.value }), {});
  }

  protected setRawCookieData(
    name: string,
    value: string,
    options: CookieOptions
  ) {
    const expires =
      typeof options.expires === 'boolean' ? new Date() : options.expires;

    if (this.runtime.isBrowser()) {
      this.document.cookie = [
        encodeURIComponent(name) + '=',
        options.encode ? options.encode(value) : value,
        options.path ? ';Path=' + options.path : '',
        options.domain ? ';domain=' + options.domain : '',
        expires ? ';expires=' + expires.toUTCString() : '',
        options.secure ? ';secure' : '',
        options.httpOnly ? '; HttpOnly' : ''
      ].join('');
    } else {
      this.response.cookie(name, value, options);
    }
  }

  protected getRawCookieData(): string {
    return this.runtime.isBrowser()
      ? this.document.cookie
      : this.request.headers.cookie || '';
  }
}
