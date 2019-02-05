import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ContentBlockComponent } from '../../content-blocks/content-block/content-block.component';
import { ContentRetrieverService } from '../../services/content-retriever.service';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import * as contentBlockArticles from './fixtures/contentBlockArticles.json';
import { By } from '@angular/platform-browser';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  const contentRetrieverMock = {
    getContent: jest.fn()
  };

  let routerEventSubscriber: Subscriber<RouterEvent>;
  const routerMock = {
    events: new Observable((subscriber) => {
      routerEventSubscriber = subscriber;
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageComponent, ContentBlockComponent]
    })
      .overrideComponent(PageComponent, {
        set: {
          providers: [
            {
              provide: ContentRetrieverService,
              useValue: contentRetrieverMock
            },
            { provide: Router, useValue: routerMock }
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
    contentRetrieverMock.getContent.mockReturnValue(of(contentBlockArticles));

    component.getData();
    assertsForFixture();
  });

  it('should render a list of content block when router navigates to "/"', () => {
    contentRetrieverMock.getContent.mockReturnValue(of(contentBlockArticles));
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventSubscriber.next(new NavigationStart(0, '/'));

    expect(getDataSpy).toBeCalled();
    expect(contentRetrieverMock.getContent).toBeCalled();
    assertsForFixture();
  });

  it('should not render any content block when the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );

    component.getData();
    assertsForFailureRetrieval();
  });

  it('should not render any content block when router navigates to "/" but the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventSubscriber.next(new NavigationStart(0, '/'));

    expect(getDataSpy).toBeCalled();
    expect(contentRetrieverMock.getContent).toBeCalled();
    assertsForFailureRetrieval();
  });

  function assertsForFixture() {
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
  }

  function assertsForFailureRetrieval() {
    fixture.detectChanges();
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(0);
  }
});
