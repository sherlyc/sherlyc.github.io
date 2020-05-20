import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {add, format, getUnixTime, sub, parse, fromUnixTime} from "date-fns";
import { TimeAgoComponent } from "./time-ago.component";

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  Object.defineProperty(global, "Date", {
    value: (arg: any) => new _Date(arg || defaultDate)
  });
  global.Date.now = () => new _Date(defaultDate).getTime();
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

  it("should show date published as timestamp when it is more than 1 hour ago and less than 2 hours ago", () => {
    // 1 hour 20 minutes ago
    component.timestamp = getUnixTime(
      sub(new Date(), { hours: 1, minutes: 20 })
    );

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));

    const expectedTimestamp = format(fromUnixTime(component.timestamp), "H:MMa");
    expect(timeAgoSpan.nativeElement.textContent).toBe(expectedTimestamp);
  });

  it("should show the timestamp when it is less than 1 hour ago", () => {
    // 20 minutes ago
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));

    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    expect(timeAgoSpan.nativeElement.textContent).toBe("20 min ago");
  });

  it("should not show the timestamp when it is more than 2 hours ago", () => {
    // 2 hours ago
    component.timestamp = getUnixTime(sub(new Date(), { hours: 2 }));
    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan).toBeFalsy();
    expect(separatorSpan).toBeFalsy();
  });

  it("should not show the timestamp when it is later than now", () => {
    // 1 minute later
    component.timestamp = getUnixTime(add(new Date(), { minutes: 1 }));
    fixture.detectChanges();

    const timeAgoSpan = fixture.debugElement.query(By.css(".time-ago"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(timeAgoSpan).toBeFalsy();
    expect(separatorSpan).toBeFalsy();
  });

  it("should show the separator on the left when specified", () => {
    // 20 minutes ago
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
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
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
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
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
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
