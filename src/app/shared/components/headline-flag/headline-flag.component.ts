import { Component, Input, OnInit } from '@angular/core';
import { HeadlineFlags } from '../../../../../common/HeadlineFlags';
import { FeatureSwitchService } from '../../../services/feature-switch/feature-switch.service';
import { FeatureNames } from '../../../../../common/FeatureNames';

@Component({
  selector: 'app-headline-flag',
  templateUrl: './headline-flag.component.html',
  styleUrls: ['./headline-flag.component.scss']
})
export class HeadlineFlagComponent {
  @Input() flag?: HeadlineFlags;
}
