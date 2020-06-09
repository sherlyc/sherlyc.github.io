import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PlayStuffComponent} from "./play-stuff.component";
import {IPlayStuff} from "../../../../common/__types__/IPlayStuff";
import {ContentBlockType} from "../../../../common/__types__/ContentBlockType";
import {By} from "@angular/platform-browser";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe("PlayStuffComponent", () => {
  let component: PlayStuffComponent;
  let fixture: ComponentFixture<PlayStuffComponent>;

  const fakeVideo = (id: string) => ({
    id,
    name: `name ${id}`,
    description: `description ${id}`,
    thumbnail: `thumbnail${id}.png`,
    poster: `poster${id}.png`,
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStuffComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = {
      type: ContentBlockType.PlayStuff,
      videos: [
        fakeVideo("1"),
        fakeVideo("2"),
        fakeVideo("3"),
        fakeVideo("4"),
        fakeVideo("5"),
        fakeVideo("6"),
        fakeVideo("7"),
        fakeVideo("8")
      ]
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render 8 videos", () => {
    component.input = {
      type: ContentBlockType.PlayStuff,
      videos: [
        fakeVideo("1"),
        fakeVideo("2"),
        fakeVideo("3"),
        fakeVideo("4"),
        fakeVideo("5"),
        fakeVideo("6"),
        fakeVideo("7"),
        fakeVideo("8")
      ]
    };

    fixture.detectChanges();
    const videoElements = fixture.debugElement.queryAll(By.css("app-play-stuff-video"));

    expect(videoElements).toHaveLength(8);
  });
});
