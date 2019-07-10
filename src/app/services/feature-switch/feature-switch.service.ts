import { Injectable } from '@angular/core';
import { Features } from '../../../../common/Features';
import { Observable } from 'rxjs';
import * as random from 'math-random';
import { StoreService } from '../store/store.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureSwitchService {
  constructor(
    private runtimeService: RuntimeService,
    private storeService: StoreService,
    private config: ConfigService,
    private http: HttpClient,
    private lotto: LottoService
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
      const isFeatureEnabled = await this.lotto
        .retrieveVariant(featureName, lotteryNumber)
        .toPromise();
      return {
        [featureName]: JSON.parse(isFeatureEnabled)
      };
    });
    return (await Promise.all(featurePromises)).reduce(
      (final, item) => ({ ...final, ...item }),
      {}
    ) as { [key in Features]: boolean };
  }
}
