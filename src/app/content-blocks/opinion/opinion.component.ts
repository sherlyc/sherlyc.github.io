import { Component, Input, OnInit } from "@angular/core";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IOpinion } from "../../../../common/__types__/IOpinion";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-opinion",
  templateUrl: "./opinion.component.html",
  styleUrls: ["./opinion.component.scss"]
})
export class OpinionComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IOpinion;
  formattedArticles: IHomepageArticleContent[] = [];

  constructor() {}

  ngOnInit(): void {
    this.formattedArticles = this.input.articles.map((article, index) => ({
      ...article,
      byline: article.byline?.toLowerCase(),
      image: {
        ...article.image,
        sixteenByNine:
          index > 0
            ? `${article.image.sixteenByNine}?format=pjpg&crop=1:1,smart`
            : article.image.sixteenByNine
      }
    }));
  }
}
