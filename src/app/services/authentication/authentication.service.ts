import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { parse, serialize, CookieSerializeOptions } from 'cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login() {}
}
