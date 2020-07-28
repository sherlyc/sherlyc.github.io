import { Component, Input, OnInit } from "@angular/core";
import { map } from "lodash-es";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";

@Component({
  selector: "app-play-stuff-video",
  templateUrl: "./play-stuff-video.component.html",
  styleUrls: ["./play-stuff-video.component.scss"]
})
export class PlayStuffVideoComponent implements OnInit {
  @Input()
  image!: string;
  @Input()
  text!: string;
  @Input()
  id!: string;
  @Input()
  orientation!: {
    mobile: Orientation;
    tablet: Orientation;
    desktop: Orientation;
  };
  @Input()
  highlight = false;
  classNames: string[] = [];

  url!: string;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.url = `https://play.stuff.co.nz/details/_${this.id}`;
    this.classNames = map(
      this.orientation,
      (orientation, device) => `${orientation}-${device}`
    );
  }

  sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: "homepagev2PlayStuff",
      articleHeadline: this.text,
      articleId: this.id
    });
  }
}
