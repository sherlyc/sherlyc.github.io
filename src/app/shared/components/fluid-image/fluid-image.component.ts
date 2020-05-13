import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { FluidImageWidth } from "../../../../../common/FluidImageWidth";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { WindowService } from "../../../services/window/window.service";
import { AspectRatio } from "../../../../../common/AspectRatio";

@Component({
  selector: "app-fluid-image",
  templateUrl: "./fluid-image.component.html",
  styleUrls: ["./fluid-image.component.scss"]
})
export class FluidImageComponent implements OnInit {
  @Input() imageSrc!: string;
  @Input() caption!: string;
  @Input() aspectRatio?: AspectRatio;
  @HostBinding("style.paddingBottom") height = `${(9 / 16) * 100}%`;

  src?: string;
  srcset?: string;
  width = 0;
  lazyload: "lazy" | "auto" = "auto";

  constructor(
    private windowService: WindowService,
    private runtime: RuntimeService
  ) {}

  private static normalizeWidth(width: number): FluidImageWidth {
    let normalizedWidth;
    for (normalizedWidth of Object.values(FluidImageWidth)) {
      if (normalizedWidth >= width) {
        return normalizedWidth as FluidImageWidth;
      }
    }
    return normalizedWidth as FluidImageWidth;
  }

  private loadImg(newWidth: FluidImageWidth, lazyload: boolean) {
    this.width = newWidth;
    this.lazyload = lazyload ? "lazy" : "auto";
    const src = `${this.imageSrc}?format=pjpg&crop=${this.aspectRatio},smart&width=${newWidth}`;
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

  ngOnInit(): void {
    if (this.runtime.isServer()) {
      this.loadImg(FluidImageWidth.s, false);
    }
    this.aspectRatio = this.aspectRatio || AspectRatio.SixteenByNine;
    const [_, width, height] = /^(\d+):(\d+)/.exec(this.aspectRatio);
    this.height = `${Number(height) / Number(width) * 100}%`;
  }
}
