import { Component, Input } from "@angular/core";
import { FluidImageWidth } from "../../../../../common/FluidImageWidth";

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
  width = 0;

  constructor() {}

  private static normalizeWidth(width: number): FluidImageWidth {
    let normalizedWidth;
    for (normalizedWidth of Object.values(FluidImageWidth)) {
      if (normalizedWidth >= width) {
        return normalizedWidth;
      }
    }
    return normalizedWidth;
  }

  private loadImg(newWidth: FluidImageWidth) {
    this.width = newWidth;
    const src = `${this.imageSrc}?format=pjpg&crop=${this.aspectRatio}&width=${newWidth}`;
    this.srcset = `${src}, ${src}&dpr=2 2x`;
    this.src = src;
  }

  onResize({ contentRect: { width } }: ResizeObserverEntry) {
    const newWidth = FluidImageComponent.normalizeWidth(width);
    if (newWidth > this.width) {
      this.loadImg(newWidth);
    }
  }
}
