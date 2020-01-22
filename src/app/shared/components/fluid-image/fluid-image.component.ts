import { Component, Input } from "@angular/core";

@Component({
  selector: "app-fluid-image",
  templateUrl: "./fluid-image.component.html",
  styleUrls: ["./fluid-image.component.scss"]
})
export class FluidImageComponent {
  @Input() imageSrc!: string;
  @Input() caption!: string;
  @Input() aspectRatio = "16:9,smart";
  src!: string;
  srcset!: string;
  width = 100;

  constructor() {}

  onResize(entry: ResizeObserverEntry) {
    const width = Math.ceil(entry.contentRect.width);
    if (width >= this.width * 1.2) {
      this.width = width;
      const src = `${this.imageSrc}?format=pjpg&crop=${this.aspectRatio}&width=${width}`;
      this.srcset = `${src}, ${src}&dpr=2 2x`;
      this.src = src;
    }
  }
}
