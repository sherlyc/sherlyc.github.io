import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayStuffComponent } from "./play-stuff.component";

describe("PlayStuffComponent", () => {
  let component: PlayStuffComponent;
  let fixture: ComponentFixture<PlayStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStuffComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
