import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnContainerComponent } from './column-container.component';
import { IColumnContainer } from '../../../../common/__types__/IColumnContainer';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { By, TransferState } from '@angular/platform-browser';
import { TransferStateMock } from '../../services/mocks/transfer-state.mock';
import { Component } from '@angular/core';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import registry from '../content-blocks.registry';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ColumnContainerComponent', () => {
  let component: ColumnContainerComponent;
  let fixture: ComponentFixture<ColumnContainerComponent>;

  @Component({
    selector: 'app-fake-content-block',
    template: ''
  })
  class FakeContentBlockComponent {}

  // @ts-ignore
  const input = {
    type: 'FakeContentBlock'
  } as IContentBlock;

  const columnContainer: IColumnContainer = {
    type: ContentBlockType.ColumnContainer,
    items: [input, input, input, input, input, input]
  };

  beforeEach(async () => {
    // @ts-ignore
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ColumnContainerComponent,
        ContentBlockDirective,
        FakeContentBlockComponent
      ],
      providers: [
        {
          provide: TransferState,
          useClass: TransferStateMock
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.input = columnContainer;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input data', async () => {
    component.input = columnContainer;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const columns = componentElement.querySelectorAll(
      '.col-lg-2.col-md-2.col-sm-4.col-xs-6.column'
    );

    expect(columns.length).toBe(6);
  });

  it('should render children', async () => {
    component.input = columnContainer;

    fixture.detectChanges();

    const children = fixture.debugElement.queryAll(
      By.directive(FakeContentBlockComponent)
    );
    expect(children.length).toBe(6);
  });
});
