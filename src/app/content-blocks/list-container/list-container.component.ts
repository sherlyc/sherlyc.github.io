import { Component, Input, OnInit } from "@angular/core";
import { IListContainer } from "../../../../common/__types__/IListContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-list-container",
  templateUrl: "./list-container.component.html",
  styleUrls: ["./list-container.component.scss"]
})
export class ListContainerComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IListContainer;
  constructor() {}

  ngOnInit() {}
}
