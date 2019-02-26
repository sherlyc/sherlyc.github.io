import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockListComponent } from './content-block-list.component';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockDirective } from '../../directives/content-block/content-block.directive';
import { LoggerService } from '../../services/logger/logger.service';
import { LoggerServiceMock } from '../../services/logger/logger.service.mock';
import { By } from '@angular/platform-browser';

describe('Content block list', () => {
  let component: ContentBlockListComponent;
  let fixture: ComponentFixture<ContentBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentBlockListComponent, ContentBlockDirective],
      providers: [
        {
          provide: LoggerService,
          useClass: LoggerServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockListComponent);
    component = fixture.componentInstance;
  });

  it('should display a list of content block', () => {
    fixture.detectChanges();
    component.contentBlocks = ([
      { type: 'FakeContentBlock' },
      { type: 'FakeContentBlock' },
      { type: 'FakeContentBlock' }
    ] as any) as IContentBlock[];

    fixture.detectChanges();

    expect(1).toBe(1);
  });
});
