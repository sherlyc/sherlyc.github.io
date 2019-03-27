import { Component, OnInit } from '@angular/core';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IPage } from '../../../../../common/__types__/IPage';
import { NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { ContentRetrieverService } from '../../../services/content-retriever/content-retriever.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor(
    private router: Router,
    private contentRetriever: ContentRetrieverService,
    private title: Title
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

  getData() {
    this.contentRetriever.getContent().subscribe((page: IPage) => {
      this.title.setTitle(page.title);
      this.contentBlocks = page.content;
    });
  }
}
