import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { Experiments } from '../../../../common/Experiments';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LoggerService } from '../logger/logger.service';
import { parse } from 'bowser';
import { WindowService } from '../window/window.service';
import { DeviceType } from '../../../../common/DeviceType';

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
    private windowService: WindowService,
    private logger: LoggerService
  ) {}

  async setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.experiment = this.loadExperiment();
  }

  private getDeviceType(): DeviceType {
    return (
      (parse(this.windowService.getWindow().navigator.userAgent).platform
        .type as DeviceType) || DeviceType.unknown
    );
  }

  private loadExperiment() {
    return new Promise<{ name: string; variant: string }>(async (resolve) => {
      const userLotteryNumber = this.lottoService.getLotteryNumber(
        Experiments.Users
      );
      const deviceType: DeviceType = this.getDeviceType();

      const experimentName = await this.retrieveVariant(
        Experiments.Users,
        userLotteryNumber,
        deviceType
      ).toPromise();
      if (experimentName === 'control') {
        resolve({
          name: Experiments.NotAssigned,
          variant: Experiments.NotAssigned
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
      : Experiments.NotAssigned;
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
          return of('control');
        })
      );
  }
}
