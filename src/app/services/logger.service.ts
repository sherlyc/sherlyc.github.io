import { environment } from '../../environments/environment';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ErrorHandler {
  constructor() {}

  handleError(error: any) {
    this.error(error);
    throw error;
  }

  log(value: any, ...rest: any[]) {
    if (!environment.production) {
      console.log(value, ...rest);
    }
  }

  error(error: Error) {
    console.error(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
