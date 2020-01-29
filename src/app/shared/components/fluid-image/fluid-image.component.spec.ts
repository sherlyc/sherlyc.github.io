import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FluidImageWidth } from "../../../../../common/FluidImageWidth";
import { FluidImageComponent } from "./fluid-image.component";

describe("FluidImageComponent", () => {
  let component: FluidImageComponent;
  let fixture: ComponentFixture<FluidImageComponent>;

  const getImg = () => fixture.debugElement.query(By.css("img"));

  const componentInput = {
    imageSrc: "https://meme.com/lucas.jpg",
    caption: "coding lucas",
    aspectRatio: "16:9,smart"
  };

  const expectedSrc = `${componentInput.imageSrc}?format=pjpg&crop=${componentInput.aspectRatio}`;

  const simulateResize = (width: FluidImageWidth | number) => {
    component.onResize({
      contentRect: { width }
    } as ResizeObserverEntry);
    fixture.detectChanges();
  };

  const expectImgWidth = (width: FluidImageWidth) =>
    expect(getImg().attributes).toMatchObject({
      src: `${expectedSrc}&width=${width}`,
      srcset: `${expectedSrc}&width=${width}, ${expectedSrc}&width=${width}&dpr=2 2x, ${expectedSrc}&width=${width}&dpr=3 3x`,
      alt: componentInput.caption
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluidImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FluidImageComponent);
    component = fixture.componentInstance;
    Object.assign(component, componentInput);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("renders nothing at the beginning", () => {
    expect(getImg()).toBeFalsy();
  });

  it("renders the image with optimal width after the element size is determined", () => {
    simulateResize(FluidImageWidth.xs);
    expect(getImg()).toBeTruthy();
    expectImgWidth(FluidImageWidth.xs);
  });

  it("rounds up the width to the next level", () => {
    simulateResize(FluidImageWidth.m + 1);
    expectImgWidth(FluidImageWidth.l);
  });

  it("limits the max width to the highest level", () => {
    simulateResize(FluidImageWidth.xl + 2020);
    expectImgWidth(FluidImageWidth.xl);
  });

  it("loads higher resolution image when width increases", () => {
    simulateResize(FluidImageWidth.xs);
    simulateResize(FluidImageWidth.m);
    expectImgWidth(FluidImageWidth.m);
  });

  it("does not load lower resolution image when width decreases", () => {
    simulateResize(FluidImageWidth.l);
    simulateResize(FluidImageWidth.m);
    expectImgWidth(FluidImageWidth.l);
  });
});