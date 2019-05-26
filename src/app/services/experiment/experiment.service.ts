import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  getVariant(experiment: string, lotteryNumber: number): Observable<string> {
    return new Observable((subscriber) => {
      this.http.get(`${this.config.getConfig().experimentAPI}?name=${experiment}&lotteryNumber=${lotteryNumber}`)
      .subscribe((response))
    });
  }
}
