import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayStuffVideoComponent } from "./play-stuff-video.component";

describe("PlayStuffVideoComponent", () => {
  let component: PlayStuffVideoComponent;
  let fixture: ComponentFixture<PlayStuffVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStuffVideoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
