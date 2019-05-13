import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IFooter } from '../../../../common/__types__/IFooter';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements IContentBlockComponent {
  constructor(private analyticsService: AnalyticsService) {}

  @Input() input!: IFooter;

  sendLinkAnalytics(name: string) {
    this.analyticsService.pushEvent(AnalyticsEventsType.FOOTER_MENU, new Map().set('name', name));
  }
}
