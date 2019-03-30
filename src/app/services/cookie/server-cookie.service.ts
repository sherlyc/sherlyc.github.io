import { Inject, Injectable } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';
import { parse, CookieSerializeOptions } from 'cookie';
import { ICookieService } from './__types__/ICookieService';

@Injectable()
export class ServerCookieService implements ICookieService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(RESPONSE) private response: Response
  ) {}

  get(name: string) {
    return this.getAll()[name];
  }

  set(name: string, value: string, options: CookieSerializeOptions = {}) {
    this.response.cookie(name, value, options);
  }

  getAll(): { [key: string]: string } {
    return parse(this.request.headers.cookie || '');
  }
}
