import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ExperimentService } from '../../services/experiment/experiment.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { LoggerService } from '../../services/logger/logger.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { Experiments } from '../../../../common/Experiments';

@Component({
  selector: 'app-experiment-container',
  templateUrl: './experiment-container.component.html'
})
export class ExperimentContainerComponent
  implements OnInit, IContentBlockComponent {
  @Input() input!: IExperimentContainer;
  contentBlocks: IContentBlock[] = [];
  variant = 'control';
  assignedExperiment?: { name: string; variant: string };

  constructor(
    private experimentService: ExperimentService,
    private runtimeService: RuntimeService,
    private loggerService: LoggerService,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    if (this.runtimeService.isServer()) {
      return;
    }

    this.assignedExperiment = await this.experimentService.getExperiment();

    if (
      this.input.name === this.assignedExperiment.name &&
      this.input.variants[this.assignedExperiment.variant]
    ) {
      this.contentBlocks = this.input.variants[this.assignedExperiment.variant];
      this.sendAnalytics(this.assignedExperiment.variant);
      return;
    } else if (this.variant === Experiments.NotAssigned) {
      this.contentBlocks = this.input.variants.control;
      if (this.contentBlocks.length > 0) {
        this.sendAnalytics(this.assignedExperiment.variant);
      }
    } else {
      this.loggerService.error(
        new Error(
          `ExperimentContainer - missing variant: ${this.variant}, in experiment: ${this.input.name}`
        )
      );
    }
    this.contentBlocks = this.input.variants[this.variant];
  }

  private sendAnalytics(variant: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.EXPERIMENT,
      experiment: this.input.name,
      variant
    });
  }
}
