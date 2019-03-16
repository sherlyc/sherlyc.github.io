import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockListComponent } from './content-block-list.component';
import { ContentBlockDirective } from '../../directives/content-block/content-block.directive';
import { LoggerService } from '../../../services/logger/logger.service';
import { LoggerServiceMock } from '../../../services/logger/logger.service.mock';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
