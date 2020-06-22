import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  formatTime,
  timeColor
} from "../../utils/timestamp-helper/timestamp-helper";
import { TimeComponent } from "./time.component";

jest.mock("../../utils/timestamp-helper/timestamp-helper");

describe("TimeComponent", () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
  });

  it("should show the separator on the left when specified", () => {
    // 20 minutes ago
    (formatTime as jest.Mock).mockReturnValue("20 min ago");
    component.separator = "left";

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css(".time"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(time.nativeElement.textContent).toBe("20 min ago");
    expect(time.nativeElement.previousElementSibling).toBe(
      separatorSpan.nativeElement
    );
  });

  it("should show the separator on the right when specified", () => {
    // 20 minutes ago
    (formatTime as jest.Mock).mockReturnValue("20 min ago");
    component.separator = "right";

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css(".time"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(time.nativeElement.textContent).toBe("20 min ago");
    expect(time.nativeElement.nextElementSibling).toBe(
      separatorSpan.nativeElement
    );
  });

  it("should not show the separator when not specified", () => {
    // 20 minutes ago
    (formatTime as jest.Mock).mockReturnValue("20 min ago");
    component.separator = undefined;

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css(".time"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(time.nativeElement.textContent).toBe("20 min ago");
    expect(separatorSpan).toBeFalsy();
  });

  it("should not show the entire block when it is formatted as empty text", () => {
    (formatTime as jest.Mock).mockReturnValue("");

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css(".time"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(time).toBeFalsy();
    expect(separatorSpan).toBeFalsy();
  });

  it("should set text color", () => {
    // 20 minutes ago
    (formatTime as jest.Mock).mockReturnValue("20 min ago");
    component.textColor = "white";

    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css(".time"));

    expect(div.nativeElement.style.color).toBe("white");
  });

  it("should set text color according to timestamp when bullet is enabled", () => {
    // 20 minutes ago
    (formatTime as jest.Mock).mockReturnValue("20 min ago");
    (timeColor as jest.Mock).mockReturnValue("#ff433d");

    component.showBullet = true;
    fixture.detectChanges();

    expect(timeColor).toHaveBeenCalled();
    expect(component.textColor).toEqual("#ff433d");
  });
});
