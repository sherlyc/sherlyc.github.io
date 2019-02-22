import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockRendererService } from '../../services/content-block-renderer/content-block-renderer.service';

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
    private renderer: ContentBlockRendererService
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.renderer.render(this.input, this.viewContainerRef);
  }
}
