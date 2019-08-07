import { Injectable } from '@angular/core';
import { FeatureName } from '../../../../common/FeatureName';
import { StoreService } from '../store/store.service';
import { ConfigService } from '../config/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { LoggerService } from '../logger/logger.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureSwitchService {
  constructor(
    private runtimeService: RuntimeService,
    private storeService: StoreService,
    private config: ConfigService,
    private http: HttpClient,
    private lotto: LottoService,
    private logger: LoggerService
  ) {}

  private features!: Promise<{ [key in FeatureName]: boolean }>;

  setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.features = this.loadFeatures();
  }

  async getFeature(featureName: FeatureName) {
    if (this.runtimeService.isServer()) {
      return false;
    }
    const features = await this.features;
    // @ts-ignore
    return features[featureName];
  }

  private async loadFeatures() {
    const featurePromises = Object.keys(FeatureName).map(
      async (featureName) => {
        const lotteryNumber = this.lotto.getLotteryNumber(featureName);
        const isFeatureEnabled = await this.isFeatureEnabled(
          featureName,
          lotteryNumber
        ).toPromise();
        return {
          [featureName]: isFeatureEnabled
        };
      }
    );
    return (await Promise.all(featurePromises)).reduce(
      (final, item) => ({ ...final, ...item }),
      {}
    ) as { [key in FeatureName]: boolean };
  }

  isFeatureEnabled(
    featureName: string,
    lotteryNumber: number
  ): Observable<boolean> {
    return this.http
      .get<boolean>(
        `${this.config.getConfig().featureAPI}/${featureName}/${lotteryNumber}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.warn(`Feature Switch Service Error - ${error}`);
          return of(false);
        })
      );
  }
}
