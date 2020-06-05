import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStuffComponent } from './playstuff.component';

describe('PlaystuffComponent', () => {
  let component: PlayStuffComponent;
  let fixture: ComponentFixture<PlayStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
