import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { RuntimeService } from "../runtime/runtime.service";
import { LottoService } from "../lotto/lotto.service";
import { ExperimentName } from "../../../../common/ExperimentName";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import { LoggerService } from "../logger/logger.service";
import { DeviceType } from "../../../../common/DeviceType";
import { DeviceService } from "../device/device.service";
import { StoreService } from "../store/store.service";

@Injectable({
  providedIn: "root"
})
export class ExperimentService {
  private experiment!: Promise<{
    name: string;
    variant: string;
  }>;

  constructor(
    private config: ConfigService,
    private runtimeService: RuntimeService,
    private lottoService: LottoService,
    private http: HttpClient,
    private logger: LoggerService,
    private device: DeviceService,
    private store: StoreService
  ) {}

  async setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.experiment = this.loadExperiment();
  }

  private loadExperiment() {
    return new Promise<{ name: string; variant: string }>(async (resolve) => {
      const userLotteryNumber = this.lottoService.getLotteryNumber(
        ExperimentName.Users
      );
      const deviceType: DeviceType = this.device.getDevice();

      const experimentName = await this.retrieveVariant(
        ExperimentName.Users,
        userLotteryNumber,
        deviceType
      );
      if (
        experimentName === ExperimentName.NotAssigned ||
        experimentName === "control"
      ) {
        resolve({
          name: ExperimentName.NotAssigned,
          variant: ExperimentName.NotAssigned
        });
        return;
      }

      const experimentLotteryNumber = this.lottoService.getLotteryNumber(
        experimentName
      );
      const variant = await this.retrieveVariant(
        experimentName,
        experimentLotteryNumber,
        deviceType
      );

      if (variant === ExperimentName.NotAssigned) {
        resolve({
          name: ExperimentName.NotAssigned,
          variant: ExperimentName.NotAssigned
        });
        return;
      }
      resolve({
        name: experimentName,
        variant
      });
    });
  }

  async getVariant(experimentName: string) {
    const experiment = await this.getExperiment();
    return experiment && experiment.name === experimentName
      ? experiment.variant
      : ExperimentName.NotAssigned;
  }

  getExperiment() {
    return this.experiment;
  }

  async retrieveVariant(
    experiment: string,
    lotteryNumber: number,
    deviceType: DeviceType
  ): Promise<string> {
    const cacheKey = `cache-exp-${experiment}-${lotteryNumber}--${deviceType}`;
    const cachedValue = this.store.get<string>(cacheKey);
    const loadPromise = (async () => {
      const result = await this.http
        .get<string>(
          `${
            this.config.getConfig().experimentAPI
          }/${experiment}/${lotteryNumber}/${deviceType}`,
          {
            responseType: "text"
          } as Object
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.logger.warn(`Experiment Service Error - ${error}`);
            return of(ExperimentName.NotAssigned);
          })
        )
        .toPromise();
      if (cachedValue) {
        this.store.set(cacheKey, result);
      }
      return result;
    })();

    return cachedValue ? cachedValue : loadPromise;
  }
}
