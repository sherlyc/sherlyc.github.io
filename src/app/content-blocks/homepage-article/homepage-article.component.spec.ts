import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomepageArticleComponent } from "./homepage-article.component";

describe("HomepageArticleComponent", () => {
  let component: HomepageArticleComponent;
  let fixture: ComponentFixture<HomepageArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageArticleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
