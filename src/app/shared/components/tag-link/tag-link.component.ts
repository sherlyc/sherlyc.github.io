import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-tag-link",
  templateUrl: "./tag-link.component.html",
  styleUrls: ["./tag-link.component.scss"]
})
export class TagLinkComponent implements OnInit {
  @Input() name!: string;
  @Input() url!: string;
  @Input() color?: string;

  constructor() { }

  ngOnInit(): void {
  }
}
