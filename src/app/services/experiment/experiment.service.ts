import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as random from 'math-random';
import { ConfigService } from '../config/config.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  experiment: {
    name: string;
    variant?: string;
  } = { name: 'control' };
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private storeService: StoreService
  ) {}

  getVariant(experiment: string, lotteryNumber: number): Observable<string> {
    return new Observable((subscriber) => {
      this.http
        .get<string>(
          `${
            this.config.getConfig().experimentAPI
          }?name=${experiment}&lotteryNumber=${lotteryNumber}`
        )
        .subscribe((result) => {
          subscriber.next(result);
          subscriber.complete();
        });
    });
  }

  getRandomNumber(experimentName: string): number {
    const experimentStorageKey = `${experimentName}ExperimentLottery`;
    const existingLotteryNumber = this.storeService.get<number>(
      experimentStorageKey
    );
    if (existingLotteryNumber) {
      return existingLotteryNumber;
    }
    const newLotteryNumber = Math.floor(random() * 100);
    this.storeService.set(experimentStorageKey, newLotteryNumber);
    return newLotteryNumber;
  }

  setUp() {
    const userLotteryNumber = this.getRandomNumber('Users');
    this.getVariant('Users', userLotteryNumber).subscribe((experimentName) => {
      this.experiment.name = experimentName;
      if (experimentName === 'control') {
        return;
      }
      const variantLotteryNumber = this.getRandomNumber(experimentName);
      this.getVariant(experimentName, variantLotteryNumber).subscribe(
        (variant) => {
          this.experiment.variant = variant;
        }
      );
    });
  }
}
