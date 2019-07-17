import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ExperimentService } from '../../services/experiment/experiment.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { LoggerService } from '../../services/logger/logger.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { FeatureSwitchService } from '../../services/feature-switch/feature-switch.service';
import { IFeatureContainer } from '../../../../common/__types__/IFeatureContainer';

@Component({
  selector: 'app-experiment-container',
  templateUrl: './feature-container.component.html'
})
export class FeatureContainerComponent
  implements OnInit, IContentBlockComponent {
  @Input() input!: IFeatureContainer;
  contentBlocks: IContentBlock[] = [];
  toggle = false;

  constructor(
    private featureSwitchService: FeatureSwitchService,
    private runtimeService: RuntimeService
  ) {}

  async ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.toggle = await this.featureSwitchService.getFeature(this.input.name);
    }
    if (this.toggle) {
      this.contentBlocks = this.input.toggle;
    }
  }
}
