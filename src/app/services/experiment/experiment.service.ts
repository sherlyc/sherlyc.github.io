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
  experiment!: Promise<{
    name: string;
    variant: string;
  }>;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private storeService: StoreService
  ) {}

  retrieveVariant(
    experiment: string,
    lotteryNumber: number
  ): Observable<string> {
    return this.http.get<string>(
      `${
        this.config.getConfig().experimentAPI
      }?name=${experiment}&lotteryNumber=${lotteryNumber}`,
      {
        responseType: 'text'
      } as Object
    );
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

  setup() {
    this.experiment = new Promise<{ name: string; variant: string }>(
      (resolve) => {
        const userLotteryNumber = this.getRandomNumber('Users');
        this.retrieveVariant('Users', userLotteryNumber).subscribe(
          (experimentName) => {
            if (experimentName === 'control') {
              resolve({
                name: 'control',
                variant: 'control'
              });
              return;
            }
            const experimentLotteryNumber = this.getRandomNumber(
              experimentName
            );
            this.retrieveVariant(
              experimentName,
              experimentLotteryNumber
            ).subscribe((variant) => {
              resolve({
                name: experimentName,
                variant
              });
            });
          }
        );
      }
    );
  }

  async getVariant(experimentName: string) {
    const experiment = await this.experiment;
    if (experiment.name === experimentName) {
      return experiment.variant;
    }
    return 'control';
  }
}
