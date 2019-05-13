import { BasicArticleTitleUnitComponent } from './basic-article-title-unit.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { By } from '@angular/platform-browser';

describe('BasicArticleTitleUnitComponent', () => {
  let component: BasicArticleTitleUnitComponent;
  let fixture: ComponentFixture<BasicArticleTitleUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BasicArticleTitleUnitComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(BasicArticleTitleUnitComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render headline component', () => {
    const headline = 'Headline';
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      indexHeadline: headline,
      linkUrl: '/headline/top-news',
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const headlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    ).nativeElement;
    expect(headlineComponent.textContent).toEqual(headline);
  });

  it('should render anchor tag with correct linkUrl', () => {
    const linkUrl = '/headline/top-news';
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      indexHeadline: 'Headline',
      linkUrl,
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchorTag.href).toEqual(`http://localhost${linkUrl}`);
  });
});
