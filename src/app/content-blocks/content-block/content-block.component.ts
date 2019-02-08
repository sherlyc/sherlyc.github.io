import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import registry from '../content-blocks-registry';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements OnInit {
  @Input()
  input!: IContentBlock;

  @ViewChild('viewContainer', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const componentFactory = registry[`${this.input.type}Component`];
    if (componentFactory) {
      const factory = this.resolver.resolveComponentFactory<
        ContentBlockComponent
      >(componentFactory);
      this.viewContainerRef.clear();
      const componentRef = this.viewContainerRef.createComponent<
        ContentBlockComponent
      >(factory);
      componentRef.instance.input = this.input;
    } else {
      console.error(`Component ${this.input.type} not found`);
    }
  }
}
