import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { environment } from '../../environments/environment';
import { IErrorBlock } from '../../../common/__types__/IErrorBlock';

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {
  constructor(
    private http: HttpClient,
    @Optional() @Inject('SERVER_BASE_URL') private serverBaseUrl: string
  ) {}

  getContent(): Observable<IContentBlock[]> {
    const url = this.serverBaseUrl
      ? `${this.serverBaseUrl}${environment.backendUrl}`
      : environment.backendUrl;

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
