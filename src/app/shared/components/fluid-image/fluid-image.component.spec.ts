import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FluidImageWidth } from "../../../../../common/FluidImageWidth";
import { FluidImageComponent } from "./fluid-image.component";
import { WindowService } from "../../../services/window/window.service";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { RuntimeService } from "../../../services/runtime/runtime.service";

describe("FluidImageComponent", () => {
  let component: FluidImageComponent;
  let fixture: ComponentFixture<FluidImageComponent>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

  const getImg = () => fixture.debugElement.query(By.css("img"));

  const componentInput = {
    imageSrc: "https://meme.com/lucas.jpg",
    caption: "coding lucas",
    aspectRatio: "16:9,smart"
  };

  const expectedSrc = `${componentInput.imageSrc}?format=pjpg&crop=${componentInput.aspectRatio}`;

  const simulateResize = (width: FluidImageWidth | number) => {
    const fakeTarget = { getBoundingClientRect: () => ({ top: 100 }) } as any;
    component.onResize({
      target: fakeTarget,
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
      declarations: [FluidImageComponent],
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FluidImageComponent);
    windowService = TestBed.get(WindowService);
    runtimeService = TestBed.get(RuntimeService);

    windowService.getWindow.mockReturnValue({});

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

  it("should load image with default config in server ", () => {
    runtimeService.isServer.mockReturnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expectImgWidth(FluidImageWidth.s);
  });

  it("should add correct height", () => {
    expect(component.height).toEqual("56.25%");
  });

  it("should set height as 0 when image fail to load", () => {
    component.error();
    expect(component.height).toEqual("0");
  });

  it("should default to auto loading", () => {
    expect(component.lazyload).toEqual("auto");
  });

  it("should set loading to auto when element is inside the viewport", () => {
    const fakeTarget = { getBoundingClientRect: () => ({ top: 100 }) } as any;

    windowService.getWindow.mockReturnValue({
      scrollY: 0,
      innerHeight: 500
    });

    component.onResize({
      target: fakeTarget,
      contentRect: { width: 100 } as any
    });
    fixture.detectChanges();

    expect(component.lazyload).toEqual("auto");
  });

  it("should set loading to lazy when element is outside the viewport", () => {
    const fakeTarget = { getBoundingClientRect: () => ({ top: 1000 }) } as any;

    windowService.getWindow.mockReturnValue({
      scrollY: 0,
      innerHeight: 500
    });

    component.onResize({
      target: fakeTarget,
      contentRect: { width: 100 } as any
    });
    fixture.detectChanges();

    expect(component.lazyload).toEqual("lazy");
  });

  it("should load image with default values when onResize is called without entry", () => {
    component.onResize(null);
    fixture.detectChanges();
    expectImgWidth(FluidImageWidth.s);
  });
});
