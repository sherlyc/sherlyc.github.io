import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GrayDefconArticleUnitComponent } from './gray-defcon-article-unit.component';
import { SharedModule } from '../../shared/shared.module';

describe('GrayDefconArticleUnitComponent', () => {
  let component: GrayDefconArticleUnitComponent;
  let fixture: ComponentFixture<GrayDefconArticleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [GrayDefconArticleUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayDefconArticleUnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
