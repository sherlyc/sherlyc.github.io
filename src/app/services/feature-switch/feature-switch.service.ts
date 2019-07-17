import { Injectable } from '@angular/core';
import { Features } from '../../../../common/Features';
import { StoreService } from '../store/store.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { LoggerService } from '../logger/logger.service';

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

  private features!: Promise<{ [key in Features]: boolean }>;

  setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.features = this.loadFeatures();
  }

  async getFeature(featureName: Features) {
    if (this.runtimeService.isServer()) {
      return false;
    }
    const features = await this.features;
    return features[featureName];
  }

  private async loadFeatures() {
    const featurePromises = Object.keys(Features).map(async (featureName) => {
      const lotteryNumber = this.lotto.getLotteryNumber(featureName);
      try {
        const isFeatureEnabled = await this.lotto
          .retrieveVariant(featureName, lotteryNumber)
          .toPromise();
        return {
          [featureName]: JSON.parse(isFeatureEnabled)
        };
      } catch (e) {
        this.logger.warn('Invalid response for feature switch');
        return {
          [featureName]: false
        };
      }
    });
    return (await Promise.all(featurePromises)).reduce(
      (final, item) => ({ ...final, ...item }),
      {}
    ) as { [key in Features]: boolean };
  }
}
