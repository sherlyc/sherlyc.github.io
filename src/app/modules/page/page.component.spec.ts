import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ContentBlockComponent } from '../../content-blocks/content-block/content-block.component';
import { ContentRetrieverService } from '../../services/content-retriever.service';
import {
  ConnectableObservable,
  Observable,
  of,
  Subscriber,
  throwError
} from 'rxjs';
import { publish } from 'rxjs/operators';
import * as contentBlocks from './fixtures/contentBlocks.json';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import Mock = jest.Mock;
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import registry from '../../content-blocks/content-blocks.registry';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fake-content-block',
  template: ''
})
class FakeContentBlockComponent {}

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  let contentRetrieverMock: Pick<ContentRetrieverService, 'getContent'>;
  let routerEventEmitter: Subscriber<RouterEvent>;
  let routerMock: Pick<Router, 'events'>;

  beforeEach(async () => {
    // set up mocks for dependency injection
    contentRetrieverMock = {
      getContent: jest.fn()
    };
    routerMock = {
      events: Observable.create((e: Subscriber<RouterEvent>) => {
        routerEventEmitter = e;
      }).pipe(publish())
    };
    (routerMock.events as ConnectableObservable<RouterEvent>).connect();

    // setup registry
    Object.keys(registry).forEach((prop) => {
      delete registry[prop];
    });
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PageComponent,
        ContentBlockComponent,
        FakeContentBlockComponent
      ]
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
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: Object.values(registry)
        }
      })
      .compileComponents();
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.resetAllMocks();
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
    (contentRetrieverMock.getContent as Mock).mockReturnValue(
      of(contentBlocks)
    );

    component.getData();

    fixture.detectChanges(); // input updated
    assertsForSuccessfulRetrieval();
  });

  it('should render a list of content block when router navigates to "/"', () => {
    (contentRetrieverMock.getContent as Mock).mockReturnValue(
      of(contentBlocks)
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit an event before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    expect(getDataSpy).toBeCalledTimes(1);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(1);

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit an event
    expect(getDataSpy).toBeCalledTimes(2);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(2);
    fixture.detectChanges(); // input updated
    assertsForSuccessfulRetrieval();
  });

  it('should not render any content block when the retriever fails to get content', () => {
    (contentRetrieverMock.getContent as Mock).mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );

    component.getData();
    assertsForFailedRetrieval();
  });

  it('should not render any content block when router navigates to "/" but the retriever fails to get content', () => {
    (contentRetrieverMock.getContent as Mock).mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit an event before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();

    routerEventEmitter.next(new NavigationStart(0, '/')); // emit an event
    assertsForFailedRetrieval();
  });

  function assertsForSuccessfulRetrieval() {
    expect(component.contentBlocks).toHaveLength(contentBlocks.length);
    (component.contentBlocks as Array<{ type: string }>).forEach(
      (contentBlock) => {
        expect(contentBlock.type).toEqual('FakeContentBlock');
      }
    );

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(contentBlocks.length);
  }

  function assertsForFailedRetrieval() {
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.directive(ContentBlockComponent))
    ).toHaveLength(0);
  }
});
