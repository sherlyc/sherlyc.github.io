import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAdUnitComponent } from './basic-ad-unit.component';

describe('BasicAdUnitComponent', () => {
  let component: BasicAdUnitComponent;
  let fixture: ComponentFixture<BasicAdUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicAdUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAdUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
