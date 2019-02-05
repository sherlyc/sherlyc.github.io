import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleUnitComponent } from './basic-article-unit.component';

describe('BasicArticleUnitComponent', () => {
  let component: BasicArticleUnitComponent;
  let fixture: ComponentFixture<BasicArticleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicArticleUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
