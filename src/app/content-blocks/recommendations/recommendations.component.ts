import { Component, Input, OnInit } from '@angular/core';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import { RuntimeService } from '../../services/runtime/runtime.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() input!: IRecommendations;

  contentBlocks: IContentBlock[] = [];

  constructor(
    private runtimeService: RuntimeService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      const { totalBasicArticlesUnit, totalBasicArticleTitleUnit } = this.input;
      this.recommendationsService
        .getRecommendations(totalBasicArticlesUnit, totalBasicArticleTitleUnit)
        .subscribe({
          next: (recommendations) =>
            (this.contentBlocks = this.createArticleSection(recommendations))
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
