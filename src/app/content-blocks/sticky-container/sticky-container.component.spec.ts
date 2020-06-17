import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransferState } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IStickyContainer } from "../../../../common/__types__/IStickyContainer";
import { ContentBlockDirective } from "../../shared/directives/content-block/content-block.directive";
import registry from "../content-blocks.registry";
import { StickyContainerComponent } from "./sticky-container.component";

describe("Sticky Container", () => {
  let fixture: ComponentFixture<StickyContainerComponent>;
  let component: StickyContainerComponent;

  const fakeContentBlock = ({
    type: "FakeContentBlock"
  } as unknown) as IContentBlock;

  @Component({
    selector: "app-fake-content-block",
    template: ""
  })
  class FakeContentBlockComponent {}

  const input: IStickyContainer = {
    type: ContentBlockType.StickyContainer,
    items: [fakeContentBlock]
  };

  beforeEach(async () => {
    // @ts-ignore
    registry["FakeContentBlockComponent"] = FakeContentBlockComponent;

    await TestBed.configureTestingModule({
      declarations: [
        StickyContainerComponent,
        ContentBlockDirective,
        FakeContentBlockComponent
      ],
      providers: [TransferState]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();
    fixture = TestBed.createComponent(StickyContainerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = input;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
