import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ContentBlockComponent } from '../../content-blocks/content-block/content-block.component';
import { ContentRetrieverService } from '../../services/content-retriever.service';
import { of, throwError } from 'rxjs';
import * as contentBlockArticles from './fixtures/contentBlockArticles.json';
import { By } from '@angular/platform-browser';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { RouterTestingModule } from '@angular/router/testing';

const contentRetrieverSpy = {
  getContent: jest.fn()
};

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: '', component: PageComponent }])
      ],
      declarations: [PageComponent, ContentBlockComponent]
    })
      .overrideComponent(PageComponent, {
        set: {
          providers: [
            { provide: ContentRetrieverService, useValue: contentRetrieverSpy }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // initial state
    expect(component.contentBlocks).toHaveLength(0);
    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(0);
  });

  it('should render a list of content block', () => {
    contentRetrieverSpy.getContent.mockReturnValue(of(contentBlockArticles));

    component.getData();
    fixture.detectChanges();
    expect(component.contentBlocks).toHaveLength(contentBlockArticles.length);
    (component.contentBlocks as IBasicArticleUnit[]).forEach((contentBlock) => {
      expect(contentBlock.type).toEqual('BasicArticleUnit');
      expect(contentBlock.indexHeadline).toBeTruthy();
      expect(contentBlock.introText).toBeTruthy();
      expect(contentBlock.linkUrl).toBeTruthy();
      expect(contentBlock.imageSrc).toBeTruthy();
      expect(contentBlock.headlineFlags).toHaveLength(0);
    });

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(contentBlockArticles.length);
  });

  it('should not render any content block when retriever fails to get content', () => {
    contentRetrieverSpy.getContent.mockReturnValue(
      throwError('Something wrong')
    );

    component.getData();
    fixture.detectChanges();
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(0);
  });
});
