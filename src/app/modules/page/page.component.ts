import { Component, OnInit } from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContentRetrieverService } from '../../services/content-retriever/content-retriever.service';
import { ClassNameService } from '../../services/class-name/class-name.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor(
    private router: Router,
    private contentRetriever: ContentRetrieverService,
    private classNameService: ClassNameService
  ) {}

  contentBlocks: IContentBlock[] = [];

  ngOnInit() {
    this.getData();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.getData();
      });
  }

  getClassName(contentBlockType: string) {
    return this.classNameService.generateClassName(contentBlockType);
  }

  getData() {
    this.contentRetriever.getContent().subscribe(
      (contentBlocks: IContentBlock[]) => {
        this.contentBlocks = contentBlocks;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  trackByFn(index: number, item: IContentBlock) {
    return index;
  }
}