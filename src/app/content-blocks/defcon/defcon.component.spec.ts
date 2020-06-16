import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefconComponent } from './defcon.component';

describe('DefconComponent', () => {
  let component: DefconComponent;
  let fixture: ComponentFixture<DefconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
