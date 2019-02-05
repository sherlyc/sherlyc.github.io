import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ContentBlockComponent } from '../../content-blocks/content-block/content-block.component';
import { ContentRetrieverService } from '../../services/content-retriever.service';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { publish } from 'rxjs/operators';
import * as contentBlockArticles from './fixtures/contentBlockArticles.json';
import { By } from '@angular/platform-browser';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  let contentRetrieverMock: any;
  let routerEventEmitter: Subscriber<RouterEvent>;
  let routerMock: any;

  beforeAll(() => {
    contentRetrieverMock = {
      getContent: jest.fn()
    };
    routerMock = {
      events: Observable.create((e: Subscriber<RouterEvent>) => {
        routerEventEmitter = e;
      }).pipe(publish())
    };
    routerMock.events.connect();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
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

    fixture.detectChanges(); // input updated
    assertsForSuccessfulRetrieval();
  });

  it('should render a list of content block when router navigates to "/"', () => {
    contentRetrieverMock.getContent.mockReturnValue(of(contentBlockArticles));
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit events before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    routerEventEmitter.next(new NavigationStart(0, '/'));
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();

    fixture.detectChanges(); // input updated
    assertsForSuccessfulRetrieval();
  });

  it('should not render any content block when the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );

    component.getData();
    assertsForFailedRetrieval();
  });

  it('should not render any content block when router navigates to "/" but the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit events before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    routerEventEmitter.next(new NavigationStart(0, '/'));
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();
    assertsForFailedRetrieval();
  });

  function assertsForSuccessfulRetrieval() {
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

  function assertsForFailedRetrieval() {
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(0);
  }
});
