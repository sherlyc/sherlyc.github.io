import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import registry from '../content-blocks.registry';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { LoggerService } from '../../services/logger/logger.service';
import { ClassNameService } from '../../services/class-name/class-name.service';

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
    private logger: LoggerService,
    private className: ClassNameService
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
      componentRef.location.nativeElement.classList.add(
        this.className.generateClassName(this.input.type)
      );
    } else {
      this.logger.error(
        new Error(`No Component found for ${this.input.type} type`)
      );
    }
  }
}
