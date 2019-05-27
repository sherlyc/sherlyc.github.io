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
  experiment!: {
    name: string;
    variant: string;
  };
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

  async setup() {
    // this.experiment =
    const userLotteryNumber = this.getRandomNumber('Users');
    const experimentName = await this.retrieveVariant(
      'Users',
      userLotteryNumber
    ).toPromise();

    if (experimentName === 'control') {
      this.experiment = {
        name: 'control',
        variant: 'control'
      };
      return;
    }

    const experimentLotteryNumber = this.getRandomNumber(experimentName);
    const variant = await this.retrieveVariant(
      experimentName,
      experimentLotteryNumber
    ).toPromise();
    this.experiment = {
      name: experimentName,
      variant
    };
  }

  getVariant(experimentName: string) {
    if (this.experiment.name === experimentName) {
      return this.experiment.variant;
    }
    return 'control';
  }
}
