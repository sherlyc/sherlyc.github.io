import { Injectable } from "@angular/core";
import { FeatureName } from "../../../../common/FeatureName";
import { StoreService } from "../store/store.service";
import { ConfigService } from "../config/config.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { RuntimeService } from "../runtime/runtime.service";
import { LottoService } from "../lotto/lotto.service";
import { LoggerService } from "../logger/logger.service";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DeviceService } from "../device/device.service";

@Injectable({
  providedIn: "root"
})
export class FeatureSwitchService {
  constructor(
    private runtime: RuntimeService,
    private store: StoreService,
    private config: ConfigService,
    private http: HttpClient,
    private lotto: LottoService,
    private logger: LoggerService,
    private device: DeviceService
  ) {}

  private features!: Promise<{ [key in FeatureName]: boolean }>;

  setup() {
    if (this.runtime.isServer()) {
      return;
    }
    this.features = this.loadFeatures();
  }

  async getFeature(featureName: FeatureName): Promise<boolean> {
    if (this.runtime.isServer()) {
      return false;
    }
    const features = await this.features;
    return features[featureName];
  }

  private async loadFeatures() {
    const featurePromises = Object.keys(FeatureName).map(
      async (featureName) => {
        const lotteryNumber = this.lotto.getLotteryNumber(featureName);
        const isFeatureEnabled = await this.isFeatureEnabled(
          featureName,
          lotteryNumber,
          this.device.getDevice()
        );
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

  private async isFeatureEnabled(
    featureName: string,
    lotteryNumber: number,
    deviceType: string
  ): Promise<boolean> {
    const cacheKey = `cache-${featureName}-${lotteryNumber}-${deviceType}`;
    const cachedValue = this.store.get<boolean>(cacheKey);
    const loadPromise = (async () => {
      const result = await this.http
        .get<boolean>(
          `${
            this.config.getConfig().featureAPI
          }/${featureName}/${lotteryNumber}/${deviceType}`
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.logger.warn(`Feature Switch Service Error - ${error}`);
            return of(false);
          })
        )
        .toPromise();
      this.store.set(cacheKey, result);
      return result;
    })();
    return cachedValue !== undefined ? !!cachedValue : loadPromise;
  }
}
