import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
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
    expect(getImg().classes).toMatchObject({ hidden: true });
  });

  it("renders the image with optimal width after the element size is determined", () => {
    component.onResize({ contentRect: { width: 375 } } as ResizeObserverEntry);
    fixture.detectChanges();
    expect(getImg().classes).toMatchObject({ hidden: false });
    expect(getImg().attributes).toMatchObject({
      src: `${expectedSrc}&width=375`,
      srcset: `${expectedSrc}&width=375, ${expectedSrc}&width=375&dpr=2 2x`,
      alt: componentInput.caption
    });
  });

  it("swaps in higher resolution image when width increases 20%", () => {
    component.onResize({ contentRect: { width: 375 } } as ResizeObserverEntry);
    fixture.detectChanges();
    component.onResize({
      contentRect: { width: 375 * 1.2 }
    } as ResizeObserverEntry);
    fixture.detectChanges();
    expect(getImg().attributes).toMatchObject({
      src: `${expectedSrc}&width=450`,
      srcset: `${expectedSrc}&width=450, ${expectedSrc}&width=450&dpr=2 2x`,
      alt: componentInput.caption
    });
  });

  it("does not swap in higher resolution image when width increases <20%", () => {
    component.onResize({ contentRect: { width: 375 } } as ResizeObserverEntry);
    fixture.detectChanges();
    component.onResize({
      contentRect: { width: 375 * 1.1 }
    } as ResizeObserverEntry);
    fixture.detectChanges();
    expect(getImg().attributes).toMatchObject({
      src: `${expectedSrc}&width=375`,
      srcset: `${expectedSrc}&width=375, ${expectedSrc}&width=375&dpr=2 2x`,
      alt: componentInput.caption
    });
  });

  it("does not swap in lower resolution image when width decreases", () => {
    component.onResize({ contentRect: { width: 375 } } as ResizeObserverEntry);
    fixture.detectChanges();
    component.onResize({
      contentRect: { width: 375 * 0.5 }
    } as ResizeObserverEntry);
    fixture.detectChanges();
    expect(getImg().attributes).toMatchObject({
      src: `${expectedSrc}&width=375`,
      srcset: `${expectedSrc}&width=375, ${expectedSrc}&width=375&dpr=2 2x`,
      alt: componentInput.caption
    });
  });
});
