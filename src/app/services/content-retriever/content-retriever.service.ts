import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { IPage } from '../../../../common/__types__/IPage';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';
import { RuntimeService } from '../runtime/runtime.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private runtime: RuntimeService,
    private config: ConfigService,
    private transferState: TransferState
  ) {}

  getContent(): Observable<IPage> {
    return new Observable<IPage>((subscriber) => {
      const KEY = makeStateKey('KEY');
      const stateContent = this.transferState.get(KEY, null);
      this.transferState.remove(KEY);
      if (stateContent) {
        subscriber.next(stateContent);
        subscriber.complete();
      } else {
        this.http
          .get<IPage>(this.config.getConfig().spadeAPI)
          .pipe(
            retry(3),
            catchError(this.handleError.bind(this))
          )
          .subscribe((result) => {
            if (this.runtime.isServer()) {
              this.transferState.set(KEY, result);
            }
            subscriber.next(result);
            subscriber.complete();
          });
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.logger.error(error);
    return of({
      title: 'Stuff',
      content: [
        { type: 'Header' },
        {
          type: 'Container',
          items: [
            {
              type: 'ErrorBlock',
              message: 'Something bad happened; please try again later.'
            }
          ]
        },
        { type: 'Footer' }
      ]
    } as IPage);
  }
}
