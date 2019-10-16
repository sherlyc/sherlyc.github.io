import { Component, Input, OnInit } from '@angular/core';
import { IRecommendations } from '../../../../common/__types__/IRecommendations';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() input!: IRecommendations;

  constructor() {}

  ngOnInit() {}
}
