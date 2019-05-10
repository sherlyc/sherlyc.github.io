import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IFooter } from '../../../../common/__types__/IFooter';
import { AnalyticsService } from '../../services/data-layer/analytics.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements IContentBlockComponent {
  constructor(private analyticsService: AnalyticsService) {}

  @Input() input!: IFooter;

  sendSocialLinkAnalytics(name: string) {
    this.analyticsService.pushEvent({
      event: 'menu.footer',
      'menu.link': name
    });
  }
}
