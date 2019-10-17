import { Component, Input, OnInit } from '@angular/core';
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

  loading = true;
  contentBlocks: IContentBlock[] = [];

  constructor(
    private runtimeService: RuntimeService,
    private recommendationsService: RecommendationsService
  ) {}

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.recommendationsService
        .getRecommendations(
          this.input.totalBasicArticlesUnit,
          this.input.totalBasicArticleTitleUnit
        )
        .subscribe({
          next: (recommendations) => {
            this.contentBlocks = recommendations;
            this.loading = false;
          }
        });
    }
  }
}
