import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuntimeService } from '../runtime/runtime.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private runtime: RuntimeService,
    @Inject(REQUEST) @Optional() private request: Request
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.runtime.isBrowser()) {
      return next.handle(req);
    }
    // in SSR, replace relative path with host or X-Forwarded-Host
    let url = req.url;
    const isRelativePath = url.startsWith('/');
    if (isRelativePath) {
      const host =
        this.request.get('x-forwarded-host') || this.request.get('host');

      url = /stuff\.co\.nz/.test(host!)
        ? `https://${host}${req.url}`
        : `http://localhost:4000${req.url}`;
    }

    return next.handle(this.populateAuthorizationHeader(req.clone({ url })));
  }

  populateAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authorization = this.request.header('Authorization');
    if (authorization) {
      return req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: authorization
        }
      });
    }
    return req;
  }
}
