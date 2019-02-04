import { Injectable } from '@angular/core';
import axios from 'axios';
import config from '../../server-src/services/config';
import { Observable, pipe } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { IContentBlock } from '../../server-src/services/__types__/IContentBlock';

@Injectable({
  providedIn: 'root'
})
export class ContentRetrieverService {

  constructor() { }

  getContent(): Observable<any> {
    return fromPromise(axios.get<IContentBlock[]>('http://localhost:4000/api/', {
      validateStatus: (status: number) => {
        return status >= 200 && status < 400;
      },
      timeout: config.requestTimeout
    }));
  }
}
