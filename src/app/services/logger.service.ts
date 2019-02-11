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

  log(...messages: any[]) {
    if (!environment.production) {
      console.log(...messages);
    }
  }

  error(error: Error, ...rest: any[]) {
    console.error(error, ...rest);
  }

  warn(...messages: any[]) {
    console.warn(...messages);
  }
}
