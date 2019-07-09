import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefconArticleUnitComponent } from './defcon-article-unit.component';
import { SharedModule } from '../../shared/shared.module';
import { MomentModule } from 'ngx-moment';

describe('DefconArticleUnitComponent', () => {
  let component: DefconArticleUnitComponent;
  let fixture: ComponentFixture<DefconArticleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule, SharedModule],
      declarations: [DefconArticleUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefconArticleUnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
