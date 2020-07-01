import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { ISkybox } from "../../../../common/__types__/ISkybox";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-skybox",
  templateUrl: "./skybox.component.html",
  styleUrls: ["./skybox.component.scss"]
})
export class SkyboxComponent implements AfterViewInit, OnDestroy {
  @Input()
  input!: ISkybox;
  @ViewChild("scroller") scroller!: ElementRef;
  scrollSubscription!: Subscription;
  buttonState: "start" | "middle" | "end" = "start";

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit() {
    this.scrollSubscription = fromEvent(this.scroller.nativeElement, "scroll")
      .pipe(distinctUntilChanged(), debounceTime(100))
      .subscribe({ next: () => this.scroll() });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  scroll() {
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
  }

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
