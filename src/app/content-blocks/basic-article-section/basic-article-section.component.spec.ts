import { BasicArticleSectionComponent } from './basic-article-section.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('basic article section', () => {
  let component: BasicArticleSectionComponent;
  let fixture: ComponentFixture<BasicArticleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [BasicArticleSectionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicArticleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section headline as link when linkUrl is provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `National`,
      displayNameColor: 'scarlet',
      linkUrl: '/national',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.headlineLink'))).toBeTruthy();
  });

  it('should not render section headline as link when linkUrl is not provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `Editor's Pick`,
      displayNameColor: 'scarlet',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.headlineLink'))).toBeFalsy();
  });

  it('should render more button when linkUrl is provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `National`,
      displayNameColor: 'scarlet',
      linkUrl: '/national',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.more'))).toBeTruthy();
  });

  it('should not render more button when linkUrl is not provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `Editor's Pick`,
      displayNameColor: 'scarlet',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.more'))).toBeFalsy();
  });
});
