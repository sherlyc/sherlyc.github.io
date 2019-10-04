import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ExperimentService } from '../../services/experiment/experiment.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { LoggerService } from '../../services/logger/logger.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-experiment-container',
  templateUrl: './experiment-container.component.html'
})
export class ExperimentContainerComponent
  implements OnInit, IContentBlockComponent {
  @Input() input!: IExperimentContainer;
  contentBlocks: IContentBlock[] = [];
  variant = 'control';

  constructor(
    private experimentService: ExperimentService,
    private runtimeService: RuntimeService,
    private loggerService: LoggerService,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    if (this.runtimeService.isServer()) {
      this.contentBlocks = this.input.variants[this.variant];
      return;
    }

    const assignedExperiment = await this.experimentService.getExperiment();
    this.setContentBlocksForVariant(assignedExperiment);
  }

  private setContentBlocksForVariant(assignedExperiment: {
    name: string;
    variant: string;
  }) {
    const isAssignedToThisExperiment =
      this.input.name === assignedExperiment.name;
    const variantExists = this.input.variants[assignedExperiment.variant];

    this.contentBlocks = this.input.variants[this.variant];

    if (isAssignedToThisExperiment) {
      if (variantExists) {
        this.contentBlocks = this.input.variants[assignedExperiment.variant];
        this.sendAnalytics(assignedExperiment.variant);
      } else {
        this.loggerService.error(
          new Error(
            `ExperimentContainer - missing variant: ${this.variant}, in experiment: ${this.input.name}`
          )
        );
      }
    }
  }

  private sendAnalytics(variant: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.EXPERIMENT,
      experiment: this.input.name,
      variant
    });
  }
}
