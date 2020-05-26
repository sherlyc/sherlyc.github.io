import { Component, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";

@Component({
  selector: "app-partner-content",
  templateUrl: "./partner-content.component.html",
  styleUrls: ["./partner-content.component.scss"]
})
export class PartnerContentComponent implements IContentBlockComponent, OnInit {
  constructor() {}

  ngOnInit(): void {}

  input!: IPartnerContent;
}
