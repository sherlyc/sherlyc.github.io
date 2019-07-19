import { ServiceMock } from 'src/app/services/mocks/MockService';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import { mockService } from '../../services/mocks/MockService';
import registry from '../content-blocks.registry';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RuntimeService } from 'src/app/services/runtime/runtime.service';
import { FeatureContainerComponent } from './feature-container.component';
import { FeatureSwitchService } from '../../services/feature-switch/feature-switch.service';
import { IFeatureContainer } from '../../../../common/__types__/IFeatureContainer';
import { By } from '@angular/platform-browser';

describe('FeatureContainerComponent', () => {
  let component: FeatureContainerComponent;
  let fixture: ComponentFixture<FeatureContainerComponent>;
  let featureSwitchServiceServiceMock: ServiceMock<FeatureSwitchService>;
  let runtimeService: ServiceMock<RuntimeService>;

  @Component({
    selector: 'app-feature-enabled-content-block',
    template: ''
  })
  class FeatureEnabledContentBlockComponent {}

  beforeAll(() => {
    // @ts-ignore
    registry[
      'FeatureEnabledContentBlockComponent'
    ] = FeatureEnabledContentBlockComponent;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        FeatureContainerComponent,
        ContentBlockDirective,
        FeatureEnabledContentBlockComponent
      ],
      providers: [
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FeatureEnabledContentBlockComponent]
        }
      })
      .compileComponents();
    featureSwitchServiceServiceMock = TestBed.get(FeatureSwitchService);
    runtimeService = TestBed.get(RuntimeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureContainerComponent);
    component = fixture.componentInstance;
  });

  // @ts-ignore
  const featureEnabledContentBlock = {
    type: 'FeatureEnabledContentBlock'
  } as IContentBlock;

  const featureContainer: IFeatureContainer = {
    type: ContentBlockType.FeatureContainer,
    // @ts-ignore
    name: 'FeatureName',
    content: [featureEnabledContentBlock] as IContentBlock[]
  };

  it('should create', () => {
    component.input = featureContainer;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render feature enabled component', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (featureSwitchServiceServiceMock.getFeature as jest.Mock).mockResolvedValue(
      true
    );
    component.input = featureContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    const controlVariantBlocks = fixture.debugElement.queryAll(
      By.directive(FeatureEnabledContentBlockComponent)
    );

    expect(controlVariantBlocks).toHaveLength(1);
  });

  it('should not render feature disabled component', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (featureSwitchServiceServiceMock.getFeature as jest.Mock).mockResolvedValue(
      false
    );
    component.input = featureContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    const otherVariantBlocks = fixture.debugElement.queryAll(
      By.directive(FeatureEnabledContentBlockComponent)
    );

    expect(otherVariantBlocks).toHaveLength(0);
  });

  it('should not render any variant in server', async () => {
    runtimeService.isBrowser.mockReturnValue(false);
    component.input = featureContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.contentBlocks).toHaveLength(0);
  });

  it('should log error when feature enabled component does not exist', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    (featureSwitchServiceServiceMock.getFeature as jest.Mock).mockResolvedValue(
      true
    );
    component.input = { ...featureContainer, content: [] };

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.contentBlocks).toHaveLength(0);
  });
});
