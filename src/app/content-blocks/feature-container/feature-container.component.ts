import { Component, Input, OnInit } from "@angular/core";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IFeatureContainer } from "../../../../common/__types__/IFeatureContainer";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-feature-container",
  templateUrl: "./feature-container.component.html"
})
export class FeatureContainerComponent
  implements OnInit, IContentBlockComponent {
  @Input() input!: IFeatureContainer;
  contentBlocks: IContentBlock[] = [];

  constructor(
    private featureSwitchService: FeatureSwitchService,
    private runtimeService: RuntimeService
  ) {}

  async ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      const isFeatureEnabled = await this.featureSwitchService.getFeature(
        this.input.name
      );

      this.contentBlocks = isFeatureEnabled
        ? this.input.content
        : this.input.fallback;
    }
  }
}
