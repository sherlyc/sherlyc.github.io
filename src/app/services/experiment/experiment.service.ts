import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { ExperimentName } from '../../../../common/ExperimentName';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LoggerService } from '../logger/logger.service';
import { DeviceType } from '../../../../common/DeviceType';
import { DeviceService } from '../device/device.service';

@Injectable({
  providedIn: 'root'
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
    private device: DeviceService
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
      ).toPromise();
      if (
        experimentName === ExperimentName.NotAssigned ||
        experimentName === 'control'
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
      ).toPromise();
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

  retrieveVariant(
    experiment: string,
    lotteryNumber: number,
    deviceType: DeviceType
  ): Observable<string> {
    return this.http
      .get<string>(
        `${
          this.config.getConfig().experimentAPI
        }/${experiment}/${lotteryNumber}/${deviceType}`,
        {
          responseType: 'text'
        } as Object
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.warn(`Experiment Service Error - ${error}`);
          return of(ExperimentName.NotAssigned);
        })
      );
  }
}
