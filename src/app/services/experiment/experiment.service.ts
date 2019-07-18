import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { Experiments } from '../../../../common/Experiments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
        Experiments.Users
      );
      const experimentName = await this.retrieveVariant(
        Experiments.Users,
        userLotteryNumber
      ).toPromise();
      if (experimentName === 'control') {
        resolve({
          name: 'control',
          variant: 'control'
        });
        return;
      }

      const experimentLotteryNumber = this.lottoService.getLotteryNumber(
        experimentName
      );
      const variant = await this.retrieveVariant(
        experimentName,
        experimentLotteryNumber
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
      : 'control';
  }

  getExperiment() {
    return this.experiment;
  }

  retrieveVariant(
    experiment: string,
    lotteryNumber: number
  ): Observable<string> {
    return this.http.get<string>(
      `${this.config.getConfig().experimentAPI}/${experiment}/${lotteryNumber}`,
      {
        responseType: 'text'
      } as Object
    );
  }
}
