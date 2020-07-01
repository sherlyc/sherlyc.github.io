import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { debounce } from "lodash-es";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { ISkybox } from "../../../../common/__types__/ISkybox";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

@Component({
  selector: "app-skybox",
  templateUrl: "./skybox.component.html",
  styleUrls: ["./skybox.component.scss"]
})
export class SkyboxComponent {
  constructor(private analyticsService: AnalyticsService) {}
  @Input()
  input!: ISkybox;
  @ViewChild("scroller") scroller!: ElementRef;

  buttonState: "start" | "middle" | "end" = "start";

  scroll = debounce(() => {
    const articlesWidth = this.scroller.nativeElement.scrollWidth;
    const scrollPosition = this.scroller.nativeElement.scrollLeft;
    const articleWidth = this.scroller.nativeElement.getBoundingClientRect()
      .width;

    if (scrollPosition === 0) {
      this.buttonState = "start";
    } else if (scrollPosition >= articlesWidth - articleWidth) {
      this.buttonState = "end";
    } else {
      this.buttonState = "middle";
    }
  });

  scrollLeft(): void {
    const scrollPosition = this.scroller.nativeElement.scrollLeft;
    const articleWidth = this.scroller.nativeElement.getBoundingClientRect()
      .width;

    this.scroller.nativeElement.scrollTo({
      left: scrollPosition - articleWidth,
      behavior: "smooth"
    });
  }

  scrollRight(): void {
    const scrollPosition = this.scroller.nativeElement.scrollLeft;
    const articleWidth = this.scroller.nativeElement.getBoundingClientRect()
      .width;

    this.scroller.nativeElement.scrollTo({
      left: scrollPosition + articleWidth,
      behavior: "smooth"
    });
  }

  sendAnalytics(article: IHomepageArticleContent) {
    const { title, id } = article;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: this.input.strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}
