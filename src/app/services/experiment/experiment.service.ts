import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as random from 'math-random';
import { ConfigService } from '../config/config.service';
import { StoreService } from '../store/store.service';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  private experiment!: Promise<{
    name: string;
    variant: string;
  }>;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private storeService: StoreService,
    private runtimeService: RuntimeService
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

  getLotteryNumber(experimentName: string): number {
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
    if (this.runtimeService.isServer()) {
      return;
    }
    this.experiment = new Promise<{ name: string; variant: string }>(
      async (resolve) => {
        const userLotteryNumber = this.getLotteryNumber('Users');
        const experimentName = await this.retrieveVariant(
          'Users',
          userLotteryNumber
        ).toPromise();
        if (experimentName === 'control') {
          resolve({
            name: 'control',
            variant: 'control'
          });
          return;
        }

        const experimentLotteryNumber = this.getLotteryNumber(experimentName);
        const variant = await this.retrieveVariant(
          experimentName,
          experimentLotteryNumber
        ).toPromise();
        resolve({
          name: experimentName,
          variant
        });
      }
    );
  }

  async getVariant(experimentName: string) {
    const experiment = await this.getExperiment();
    return experiment && experiment.name === experimentName
      ? experiment.variant
      : 'control';
  }

  getExperiment() {
    return this.experiment;
  }
}
