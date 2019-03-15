import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuntimeService } from '../runtime/runtime.service';
import { CookieNames } from '../../../../common/__types__/CookieNames';
import { CookieService } from '../cookie/cookie.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private runtime: RuntimeService,
    private cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.runtime.isBrowser()) {
      return next.handle(req);
    }

    return next.handle(this.populateServerCookies(req));
  }

  populateServerCookies(req: HttpRequest<any>): HttpRequest<any> {
    const allCookies = this.cookieService.getAll();
    const cookieString = Object.values(CookieNames)
      .filter((name) => allCookies[name])
      .map((name) => `${name}=${allCookies[name]}`)
      .join('; ');
    return req.clone({
      withCredentials: true,
      setHeaders: {
        Cookie: cookieString
      }
    });
  }
}
