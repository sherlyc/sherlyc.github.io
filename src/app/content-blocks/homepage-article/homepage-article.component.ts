import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IHomepageArticle } from "../../../../common/__types__/IHomepageArticle";

@Component({
  selector: "app-homepage-article",
  templateUrl: "./homepage-article.component.html",
  styleUrls: ["./homepage-article.component.scss"]
})
export class HomepageArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IHomepageArticle;

  constructor() {}

  ngOnInit(): void {}
}
