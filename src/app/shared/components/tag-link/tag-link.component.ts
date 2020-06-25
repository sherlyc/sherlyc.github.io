import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tag-link",
  templateUrl: "./tag-link.component.html",
  styleUrls: ["./tag-link.component.scss"]
})
export class TagLinkComponent {
  @Input() name!: string;
  @Input() url!: string;
  @Input() color?: string;

  onClick(event: Event){
    event.stopPropagation();
  }
}
