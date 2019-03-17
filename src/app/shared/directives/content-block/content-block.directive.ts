import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { LoggerService } from '../../../services/logger/logger.service';
import registry from '../../../content-blocks/content-blocks.registry';
import { IContentBlockComponent } from '../../../content-blocks/__types__/IContentBlockComponent';

@Directive({
  selector: '[appContentBlock]'
})
export class ContentBlockDirective implements OnInit {
  input!: IContentBlock;

  @Input() set appContentBlock(input: IContentBlock) {
    this.input = input;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.render();
  }

  render() {
    const componentFactory = registry[`${this.input.type}Component`];
    if (componentFactory) {
      const factory = this.resolver.resolveComponentFactory<
        IContentBlockComponent
      >(componentFactory);
      const componentRef = this.viewContainerRef.createComponent<
        IContentBlockComponent
      >(factory);
      componentRef.instance.input = this.input;
    } else {
      this.logger.error(
        new Error(`No Component found for ${this.input.type} type`)
      );
    }
  }
}
