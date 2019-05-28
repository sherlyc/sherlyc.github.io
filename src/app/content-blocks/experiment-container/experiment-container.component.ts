import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ExperimentService } from '../../services/experiment/experiment.service';

@Component({
  selector: 'app-experiment-container',
  templateUrl: './experiment-container.component.html'
})
export class ExperimentContainerComponent
  implements OnInit, IContentBlockComponent {
  @Input() input!: IExperimentContainer;
  contentBlocks: IContentBlock[] = [];
  variant = 'control';

  constructor(private experimentService: ExperimentService) {}

  async ngOnInit() {
    this.variant = await this.experimentService.getVariant(this.input.name);
    this.contentBlocks = this.input.variants[this.variant];
  }
}
