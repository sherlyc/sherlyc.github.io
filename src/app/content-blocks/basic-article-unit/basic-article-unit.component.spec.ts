import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleUnitComponent } from './basic-article-unit.component';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { MomentModule } from 'ngx-moment';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('BasicArticleUnitComponent', () => {
  let component: BasicArticleUnitComponent;
  let fixture: ComponentFixture<BasicArticleUnitComponent>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;

  const articleData: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    indexHeadline: 'Dummy Headline',
    introText: 'Dummy intro text',
    linkUrl: 'https://dummyurl.com',
    imageSrc: 'https://dummyimagesrc.com',
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule],
      declarations: [BasicArticleUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleUnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input data', async () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector('a');

    expect(a!.getAttribute('href')).toEqual(articleData.linkUrl);

    const h3 = componentElement.querySelector('h3');
    expect(h3!.textContent).toEqual(articleData.indexHeadline);

    const img = componentElement.querySelector('img');
    expect(img!.getAttribute('src')).toEqual(articleData.imageSrc);
    expect(img!.getAttribute('alt')).toEqual(articleData.indexHeadline);

    const span = componentElement.querySelector('p span');
    expect(span!.textContent).toEqual('2 days ago');
  });
});
