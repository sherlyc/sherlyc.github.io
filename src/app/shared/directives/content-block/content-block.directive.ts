import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from "@angular/core";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import registry from "../../../content-blocks/content-blocks.registry";
import { IContentBlockComponent } from "../../../content-blocks/__types__/IContentBlockComponent";
import { LoggerService } from "../../../services/logger/logger.service";
import { SeoService } from "../../../services/seo/seo.service";

@Directive({
  selector: "[appContentBlock]",
})
export class ContentBlockDirective implements OnChanges {
  @Input("appContentBlock")
  input!: IContentBlock | IContentBlock[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private logger: LoggerService,
    private seo: SeoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("input")) {
      this.viewContainerRef.clear();
      const inputs = Array.isArray(this.input) ? this.input : [this.input];
      if (inputs.length > 0) {
        inputs
          .filter(Boolean)
          .forEach((input, index) => this.render(input, index));
      }
    }
  }

  render(input: IContentBlock, index: number) {
    const componentFactory = registry[`${input.type}Component`];
    if (componentFactory) {
      const factory = this.resolver.resolveComponentFactory<
        IContentBlockComponent
      >(componentFactory);
      const componentRef = this.viewContainerRef.createComponent<
        IContentBlockComponent
      >(factory);
      componentRef.instance.input = input;
      componentRef.instance.index = this.seo.index(input.type);
    } else {
      this.logger.error(
        new Error(
          `ContentBlockDirective - no component found for ${input.type} type`
        )
      );
    }
  }
}
