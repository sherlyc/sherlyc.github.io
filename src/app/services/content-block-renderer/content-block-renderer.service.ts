import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import registry from '../../content-blocks/content-blocks.registry';
import { IContentBlockComponent } from '../../content-blocks/__types__/IContentBlockComponent';
import { LoggerService } from '../logger/logger.service';
import { ClassNameService } from '../class-name/class-name.service';

@Injectable({
  providedIn: 'root'
})
export class ContentBlockRendererService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private logger: LoggerService,
    private className: ClassNameService
  ) {}

  render(input: IContentBlock, viewContainerRef: ViewContainerRef) {
    const componentFactory = registry[`${input.type}Component`];
    if (componentFactory) {
      const factory = this.resolver.resolveComponentFactory<
        IContentBlockComponent
      >(componentFactory);
      const componentRef = viewContainerRef.createComponent<
        IContentBlockComponent
      >(factory);
      componentRef.instance.input = input;
      componentRef.location.nativeElement.classList.add(
        this.className.generateClassName(input.type)
      );
    } else {
      this.logger.error(new Error(`No Component found for ${input.type} type`));
    }
  }
}
