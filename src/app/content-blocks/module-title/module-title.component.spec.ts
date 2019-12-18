import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModuleTitleComponent } from "./module-title.component";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";
import { By } from "@angular/platform-browser";

describe("ErrorBlockComponent", () => {
  let component: ModuleTitleComponent;
  let fixture: ComponentFixture<ModuleTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleTitleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTitleComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the module name", () => {
    const moduleName = "FakeModuleName";

    component.input = {
      displayName: moduleName
    } as IModuleTitle;
    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".title"));
    expect(moduleTitle.nativeElement.textContent).toEqual(moduleName);
  });

  it("should display the color", () => {
    const moduleColor = "FakeModuleColor";

    component.input = {
      displayNameColor: moduleColor
    } as IModuleTitle;
    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css("." + moduleColor));
    expect(moduleTitle).toBeTruthy();
  });
});
