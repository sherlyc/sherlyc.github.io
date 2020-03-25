import { ContainerComponent } from "./container.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContentBlockDirective } from "../../shared/directives/content-block/content-block.directive";
import { IContentBlock } from "common/__types__/IContentBlock";
import { By, TransferState } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Section } from "../../../../server-src/services/section";
import { mockService } from "../../services/mocks/MockService";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import registry from "../content-blocks.registry";

describe("Container Component", () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  // @ts-ignore
  const input = {
    type: "FakeContentBlock"
  } as IContentBlock;

  @Component({
    selector: "app-fake-content-block",
    template: ""
  })
  class FakeContentBlockComponent {}

  const fakeContentBlock = {
    type: ContentBlockType.BasicArticleSection,
    displayName: "National",
    displayNameColor: "toreabay",
    linkUrl: "/" + Section.National,
    items: [input, input, input, input]
  } as IContentBlock;

  beforeEach(async () => {
    // @ts-ignore
    registry["FakeContentBlockComponent"] = FakeContentBlockComponent;
    await TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        FakeContentBlockComponent,
        ContentBlockDirective
      ],
      providers: [
        TransferState,
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render content blocks", async () => {
    // @ts-ignore
    component.input = fakeContentBlock;

    fixture.detectChanges();

    const children = fixture.debugElement.queryAll(
      By.directive(FakeContentBlockComponent)
    );
    expect(children.length).toBe(4);
  });
});
