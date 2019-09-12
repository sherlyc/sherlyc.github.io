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
    if (this.runtimeService.isBrowser()) {
      this.variant = await this.experimentService.getVariant(this.input.name);
    }
    if (this.input.variants[this.variant]) {
      this.contentBlocks = this.input.variants[this.variant];
      if (this.contentBlocks.length > 0) {
        this.sendAnalytics();
      }
    } else if (this.variant === this.experimentService.noExperimentAssigned) {
      this.contentBlocks = this.input.variants.control;
      if (this.contentBlocks.length > 0) {
        this.sendAnalytics();
      }
    } else {
      this.loggerService.error(
        new Error(
          `ExperimentContainer - missing variant: ${this.variant}, in experiment: ${this.input.name}`
        )
      );
    }
  }

  private sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.EXPERIMENT,
      variant: this.variant,
      experiment: this.variant === this.experimentService.noExperimentAssigned ? this.variant : this.input.name
    });
  }
}
