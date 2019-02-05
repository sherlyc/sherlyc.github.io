import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {
  constructor(private http: HttpClient) {}

  getContent(): Observable<IContentBlock[]> {
    return this.http
      .get<IContentBlock[]>(environment.backendUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
