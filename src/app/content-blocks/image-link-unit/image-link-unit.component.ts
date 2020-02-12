import { Component, Input } from "@angular/core";
import { IImageLinkUnit } from "../../../../common/__types__/IImageLinkUnit";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-image-link-unit",
  templateUrl: "./image-link-unit.component.html",
  styleUrls: ["./image-link-unit.component.scss"]
})
export class ImageLinkUnitComponent implements IContentBlockComponent {
  @Input() input!: IImageLinkUnit;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, title, id } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}
