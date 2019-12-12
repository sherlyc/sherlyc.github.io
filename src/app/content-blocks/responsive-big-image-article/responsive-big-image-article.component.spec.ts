import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResponsiveBigImageArticleComponent } from "./responsive-big-image-article.component";

describe("Responsive Big Image Article", () => {
  let fixture: ComponentFixture<ResponsiveBigImageArticleComponent>;
  let component: ResponsiveBigImageArticleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsiveBigImageArticleComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveBigImageArticleComponent);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
