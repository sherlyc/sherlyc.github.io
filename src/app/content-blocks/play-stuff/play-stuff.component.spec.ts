import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Orientation } from "../../../../common/__types__/IHomepageArticle";
import { PlayStuffComponent } from "./play-stuff.component";

describe("PlayStuffComponent", () => {
  let component: PlayStuffComponent;
  let fixture: ComponentFixture<PlayStuffComponent>;

  const fakeVideo = (id: string) => ({
    id,
    name: `name ${id}`,
    description: `description ${id}`,
    thumbnail: `thumbnail${id}.png`,
    poster: `poster${id}.png`
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
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render 8 videos", () => {
    fixture.detectChanges();
    const videoElements = fixture.debugElement.queryAll(
      By.css("app-play-stuff-video")
    );

    expect(videoElements).toHaveLength(8);

    const featuredVideo = component.input.videos[0];
    const featuredVideoElement: HTMLUnknownElement &
      any = fixture.debugElement.query(
      By.css(".top .cell app-play-stuff-video")
    ).nativeElement;
    expect(featuredVideoElement.id).toEqual(featuredVideo.id);
    expect(featuredVideoElement.image).toEqual(featuredVideo.poster);
    expect(featuredVideoElement.text).toEqual(featuredVideo.name);
    expect(featuredVideoElement.highlight).toEqual(true);
    expect(featuredVideoElement.orientation).toEqual({
      mobile: Orientation.Portrait,
      tablet: Orientation.Portrait,
      desktop: Orientation.Portrait
    });

    const threeItemsVideos = component.input.videos.slice(1, 4);
    const threeItems: Array<
      HTMLUnknownElement & any
    > = fixture.debugElement
      .queryAll(By.css(".three-items app-play-stuff-video"))
      .map((item) => item.nativeElement);
    expect(threeItems).toHaveLength(3);
    threeItems.forEach((item, index) => {
      const video = threeItemsVideos[index];
      expect(item.id).toEqual(video.id);
      expect(item.image).toEqual(video.thumbnail);
      expect(item.text).toEqual(video.name);
      expect(item.highlight).toBeFalsy();
      expect(item.orientation).toEqual({
        mobile: Orientation.Landscape,
        tablet: Orientation.Portrait,
        desktop: Orientation.Landscape
      });
    });

    const bottomVideos = component.input.videos.slice(4);
    const bottomVideoElements: Array<
      HTMLUnknownElement & any
    > = fixture.debugElement
      .queryAll(By.css(".bottom app-play-stuff-video"))
      .map((item) => item.nativeElement);
    expect(bottomVideoElements).toHaveLength(4);
    bottomVideoElements.forEach((item, index) => {
      const video = bottomVideos[index];
      expect(item.id).toEqual(video.id);
      expect(item.image).toEqual(video.thumbnail);
      expect(item.text).toEqual(video.name);
      expect(item.highlight).toBeFalsy();
      expect(item.orientation).toEqual({
        mobile: Orientation.Landscape,
        tablet: Orientation.Portrait,
        desktop: Orientation.Portrait
      });
    });
  });

  it("should render videos when there are fewer than 8", () => {
    component.input = {
      type: ContentBlockType.PlayStuff,
      videos: [fakeVideo("1"), fakeVideo("2"), fakeVideo("3")]
    };

    fixture.detectChanges();
    const videoElements = fixture.debugElement.queryAll(
      By.css("app-play-stuff-video")
    );

    expect(videoElements).toHaveLength(3);
  });
});
