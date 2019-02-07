import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleUnitComponent } from './basic-article-unit.component';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';

describe('BasicArticleUnitComponent', () => {
  let component: BasicArticleUnitComponent;
  let fixture: ComponentFixture<BasicArticleUnitComponent>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;

  const articleData: IBasicArticleUnit = {
    type: 'BasicArticleUnit',
    indexHeadline: 'Dummy Headline',
    introText: 'Dummy intro text',
    linkUrl: 'https://dummyurl.com',
    imageSrc: 'https://dummyimagesrc.com',
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BasicArticleUnitComponent, TimeAgoPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.input = articleData;
    expect(component).toBeTruthy();
  });

  it('should render input data', async () => {
    component.input = articleData;

    await fixture.whenStable();
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
