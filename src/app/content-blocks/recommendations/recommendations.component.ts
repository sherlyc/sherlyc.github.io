import { Component, Input, OnInit } from '@angular/core';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { RecommendationsService } from '../../services/recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() input!: IRecommendations;
  articles: IContentBlock[] = [];

  constructor(private recommendationsService: RecommendationsService) {}

  ngOnInit() {
    this.recommendationsService.getRecommendations();
  }
}
