import { Component, Input, OnInit } from '@angular/core';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';
import { FeatureSwitchService } from '../../../services/feature-switch/feature-switch.service';
import { FeatureNames } from '../../../../../common/FeatureNames';

@Component({
  selector: 'app-headline-flag',
  templateUrl: './headline-flag.component.html',
  styleUrls: ['./headline-flag.component.scss']
})
export class HeadlineFlagComponent implements OnInit {
  @Input() flag?: HeadlineFlags;
  isVisible = false;

  constructor(private featureSwitchService: FeatureSwitchService) {}

  async ngOnInit() {
    this.isVisible = await this.featureSwitchService.getFeature(
      FeatureNames.HeadlineFlagsFeature
    );
  }
}
