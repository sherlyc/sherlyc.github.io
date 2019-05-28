import { ServiceMock } from 'src/app/services/mocks/MockService';
import { ExperimentService } from './../../services/experiment/experiment.service';
import { ExperimentContainerComponent } from './experiment-container.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import { TransferState, By } from '@angular/platform-browser';
import { mockService } from '../../services/mocks/MockService';
import registry from '../content-blocks.registry';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';

describe('ExperimentContainerComponent', () => {
  let component: ExperimentContainerComponent;
  let fixture: ComponentFixture<ExperimentContainerComponent>;
  let experimentService: ServiceMock<ExperimentService>;

  @Component({
    selector: 'app-fake-content-block',
    template: ''
  })
  class FakeContentBlockComponent {}

  beforeAll(() => {
    // @ts-ignore
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ExperimentContainerComponent,
        ContentBlockDirective,
        FakeContentBlockComponent
      ],
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: ExperimentService,
          useClass: mockService(ExperimentService)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();
    experimentService = TestBed.get(ExperimentService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentContainerComponent);
    component = fixture.componentInstance;
  });

  // @ts-ignore
  const input = {
    type: 'FakeContentBlock'
  } as IContentBlock;

  const experimentContainer: IExperimentContainer = {
    type: ContentBlockType.ExperimentContainer,
    name: 'ExperimentName',
    variants: {
      control: [input] as IContentBlock[],
      red: []
    }
  };

  it('should create', () => {
    component.input = experimentContainer;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render control variant', async () => {
    (experimentService.getVariant as jest.Mock).mockResolvedValue('control');
    component.input = experimentContainer;

    await component.ngOnInit();
    fixture.detectChanges();

    const children = fixture.debugElement.queryAll(
      By.directive(FakeContentBlockComponent)
    );

    expect(children.length).toBe(1);
  });
});
