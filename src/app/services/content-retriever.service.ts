import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { environment } from '../../environments/environment';
import { IErrorBlock } from '../../../common/__types__/IErrorBlock';
import { isPlatformBrowser } from '@angular/common';

declare const process: any;

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {
  isBrowser: boolean;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getContent(): Observable<IContentBlock[]> {
    let url = environment.backendUrl;
    if (!this.isBrowser) {
      const port = process.env.PORT || 4000;
      url = `http://localhost:${port}${url}`;
    }

    return this.http
      .get<IContentBlock[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    return of([
      {
        type: 'ErrorBlock',
        message: 'Something bad happened; please try again later.'
      } as IErrorBlock
    ]);
  }
}
