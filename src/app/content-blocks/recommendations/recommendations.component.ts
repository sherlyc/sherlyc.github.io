import { Component, Input, OnInit } from "@angular/core";
import { from, zip } from "rxjs";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleSection } from "../../../../common/__types__/IBasicArticleSection";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IRecommendations } from "../../../../common/__types__/IRecommendations";
import { FeatureName } from "../../../../common/FeatureName";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { RecommendationsService } from "../../services/recommendations/recommendations.service";
import { RuntimeService } from "../../services/runtime/runtime.service";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.component.html"
})
export class RecommendationsComponent implements OnInit {
  @Input() input!: IRecommendations;

  contentBlocks: IContentBlock[] = [];

  constructor(
    private runtimeService: RuntimeService,
    private recommendationsService: RecommendationsService,
    private featureSwitchService: FeatureSwitchService
  ) {}

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      const { totalBasicArticlesUnit, totalBasicArticleTitleUnit } = this.input;
      zip(
        from(
          this.featureSwitchService.getFeature(
            FeatureName.RecommendationDisplay
          )
        ),
        this.recommendationsService.getRecommendations(
          totalBasicArticlesUnit,
          totalBasicArticleTitleUnit
        )
      ).subscribe(([isFeatureEnabled, recommendations]) => {
        if (isFeatureEnabled && recommendations.length) {
          this.contentBlocks = this.createArticleSection(recommendations);
        }
      });
    }
  }

  private createArticleSection(items: IContentBlock[]): IBasicArticleSection[] {
    const { displayName, displayNameColor } = this.input;
    return [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName,
        displayNameColor,
        items
      }
    ];
  }
}
