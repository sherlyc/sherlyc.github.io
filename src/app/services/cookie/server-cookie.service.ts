import { Inject, Injectable } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';
import { parseCookie } from './cookie.helper';
import { ICookieOptions } from './__types__/ICookieOptions';

@Injectable()
export class ServerCookieService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(RESPONSE) private response: Response
  ) {}

  get(name: string) {
    return this.getAll()[name];
  }

  set(name: string, value: string, options: ICookieOptions = {}) {
    this.response.cookie(name, value, options);
  }

  getAll(): { [key: string]: string } {
    return parseCookie(this.request.headers.cookie || '');
  }
}
