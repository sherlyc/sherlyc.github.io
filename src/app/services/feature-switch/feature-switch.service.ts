import { Injectable } from '@angular/core';
import { FeatureNames } from '../../../../common/FeatureNames';
import { StoreService } from '../store/store.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { LoggerService } from '../logger/logger.service';
import { Observable } from 'rxjs';

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

  private features!: Promise<{ [key in FeatureNames]: boolean }>;

  setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.features = this.loadFeatures();
  }

  async getFeature(featureName: FeatureNames) {
    if (this.runtimeService.isServer()) {
      return false;
    }
    const features = await this.features;
    return features[featureName];
  }

  private async loadFeatures() {
    const featurePromises = Object.keys(FeatureNames).map(
      async (featureName) => {
        const lotteryNumber = this.lotto.getLotteryNumber(featureName);
        try {
          const isFeatureEnabled = await this.isFeatureEnabled(
            featureName,
            lotteryNumber
          ).toPromise();
          return {
            [featureName]: isFeatureEnabled
          };
        } catch (e) {
          this.logger.warn(`Feature Switch Service Error - ${e}`);
          return {
            [featureName]: false
          };
        }
      }
    );
    return (await Promise.all(featurePromises)).reduce(
      (final, item) => ({ ...final, ...item }),
      {}
    ) as { [key in FeatureNames]: boolean };
  }

  isFeatureEnabled(
    featureName: string,
    lotteryNumber: number
  ): Observable<string> {
    return this.http.get<string>(
      `${this.config.getConfig().featureAPI}/${featureName}/${lotteryNumber}`
    );
  }
}
