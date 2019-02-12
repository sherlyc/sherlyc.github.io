import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import registry from '../content-blocks.registry';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IContentBlock;

  @ViewChild('viewContainer', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    const componentFactory = registry[`${this.input.type}Component`];
    if (componentFactory) {
      const factory = this.resolver.resolveComponentFactory<
        IContentBlockComponent
      >(componentFactory);
      this.viewContainerRef.clear();
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
