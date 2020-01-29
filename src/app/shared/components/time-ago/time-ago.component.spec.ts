import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TimeAgoComponent } from "./time-ago.component";
import moment = require("moment");
import { By } from "@angular/platform-browser";

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  // @ts-ignore
  global.Date = (arg: any) => new _Date(arg || defaultDate);
  global.Date.UTC = _Date.UTC;
}

describe("TimeAgoComponent", () => {
  let component: TimeAgoComponent;
  let fixture: ComponentFixture<TimeAgoComponent>;

  beforeAll(() => {
    fakeDate("2019-07-01");
  });

  afterAll(() => {
    global.Date = _Date;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeAgoComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TimeAgoComponent);
    component = fixture.componentInstance;
  });

  it("should show the timestamp when it is less than 2 hours but more than 1 hour ago", () => {
    // 1 hour 20 minutes ago
    component.timestamp = moment()
      .subtract(1, "h")
      .subtract(20, "m")
      .unix();

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("1 hour 20 min ago");
  });

  it("should show the timestamp when it is less than 1 hour ago", () => {
    // 20 minutes ago
    component.timestamp = moment()
      .subtract(20, "m")
      .unix();

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("20 min ago");
  });

  it("should not show the timestamp when it is more than 2 hours ago", () => {
    component.timestamp = moment()
      .subtract(2, "h")
      .unix();
    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan).toBeFalsy();
    expect(separatorSpan).toBeFalsy();
  });

  it("should not show the timestamp when it is later than now", () => {
    component.timestamp = moment().add(1, "m");
    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan).toBeFalsy();
    expect(separatorSpan).toBeFalsy();
  });

  it("should show the separator on the left when specified", () => {
    // 20 minutes ago
    component.timestamp = moment()
      .subtract(20, "m")
      .unix();
    component.separator = "left";

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("20 min ago");
    expect(timeAgoSpan.nativeElement.previousElementSibling).toBe(
      separatorSpan.nativeElement
    );
  });

  it("should show the separator on the right when specified", () => {
    // 20 minutes ago
    component.timestamp = moment()
      .subtract(20, "m")
      .unix();
    component.separator = "right";

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("20 min ago");
    expect(timeAgoSpan.nativeElement.nextElementSibling).toBe(
      separatorSpan.nativeElement
    );
  });

  it("should not show the separator when not specified", () => {
    // 20 minutes ago
    component.timestamp = moment()
      .subtract(20, "m")
      .unix();
    component.separator = undefined;

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("20 min ago");
    expect(separatorSpan).toBeFalsy();
  });

  it("should set text color on div", () => {
    component.textColor = "white";

    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css("div"));

    expect(div.nativeElement.style.color).toBe("white");
  });
});
