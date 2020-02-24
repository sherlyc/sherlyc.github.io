import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-big-image-article-unit",
  templateUrl: "./big-image-article-unit.component.html",
  styleUrls: ["./big-image-article-unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigImageArticleUnitComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IBigImageArticleUnit;
  @HostBinding("class.pumped") pumped = false;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.pumped = !!this.input.pumped;
  }

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
