import { Component, HostBinding, Input } from "@angular/core";
import { FluidImageWidth } from "../../../../../common/FluidImageWidth";
import { WindowService } from "../../../services/window/window.service";

@Component({
  selector: "app-fluid-image",
  templateUrl: "./fluid-image.component.html",
  styleUrls: ["./fluid-image.component.scss"]
})
export class FluidImageComponent {
  @Input() imageSrc!: string;
  @Input() caption!: string;

  @Input() aspectRatio = "16:9,smart";
  @HostBinding("style.paddingBottom") height = `${(9 / 16) * 100}%`;

  src: string | undefined;
  srcset!: string;
  width = 0;
  lazyload: "lazy" | "auto" = "auto";

  constructor(private windowService: WindowService) {}

  private static normalizeWidth(width: number): FluidImageWidth {
    let normalizedWidth;
    for (normalizedWidth of Object.values(FluidImageWidth)) {
      if (normalizedWidth >= width) {
        return normalizedWidth;
      }
    }
    return normalizedWidth;
  }

  private loadImg(newWidth: FluidImageWidth, lazyload: boolean) {
    this.width = newWidth;
    this.lazyload = lazyload ? "lazy" : "auto";
    const src = `${this.imageSrc}?format=pjpg&crop=${this.aspectRatio}&width=${newWidth}`;
    this.srcset = `${src}, ${src}&dpr=2 2x, ${src}&dpr=3 3x`;
    this.src = src;
  }

  error() {
    this.src = undefined;
    this.height = "0";
  }

  onResize(resizeObserverEntry: ResizeObserverEntry | null) {
    if (
      resizeObserverEntry &&
      resizeObserverEntry.target &&
      resizeObserverEntry.contentRect
    ) {
      const {
        target,
        contentRect: { width }
      } = resizeObserverEntry;

      const window = this.windowService.getWindow();
      const viewportStart = window.scrollY;
      const viewportEnd = viewportStart + window.innerHeight;
      const elementTop = target.getBoundingClientRect().top;
      const isInViewport =
        elementTop >= viewportStart && elementTop < viewportEnd;

      const newWidth = FluidImageComponent.normalizeWidth(width);
      if (newWidth > this.width) {
        this.loadImg(newWidth, !isInViewport);
      }
    } else {
      this.loadImg(FluidImageWidth.s, false);
    }
  }
}
