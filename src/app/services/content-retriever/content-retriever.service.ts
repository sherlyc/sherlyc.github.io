import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IErrorBlock } from '../../../../common/__types__/IErrorBlock';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private config: ConfigService
  ) {}

  getContent(): Observable<IContentBlock[]> {
    return this.http
      .get<IContentBlock[]>(this.config.getConfig().spadeAPI)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    this.logger.error(error);

    return of([
      {
        type: 'ErrorBlock',
        message: 'Something bad happened; please try again later.'
      } as IErrorBlock
    ]);
  }
}
