import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { getUnixTime, sub } from "date-fns";
import { TimeComponent } from "./time.component";

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  Object.defineProperty(global, "Date", {
    value: (arg: any) => new _Date(arg || defaultDate)
  });
  global.Date.now = () => new _Date(defaultDate).getTime();
}

describe("TimeComponent", () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeAll(() => {
    fakeDate("2019-07-01");
  });

  afterAll(() => {
    global.Date = _Date;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
  });

  it.each`
      minutesAgo  | expected
      ${1}        | ${"1 min ago"}
      ${20}       | ${"20 min ago"}
      ${59}       | ${"59 min ago"}
    `(
    "should show time ago when it is between 1 to 59 minutes ago ($minutesAgo min ago)",
    ({ minutesAgo, expected }) => {
      component.timestamp = getUnixTime(sub(new Date(), { minutes: minutesAgo }));

      fixture.detectChanges();
      const timeSpan = fixture.debugElement.query(By.css(".time"));

      expect(timeSpan.nativeElement.textContent).toBe(expected);
    });

  it.each`
      inputTime                           | expected
      ${"January 01, 2020 10:00:00"}      | ${"10:00am"}
      ${"January 01, 2020 10:45:00"}      | ${"10:45am"}
      ${"January 01, 2020 11:00:00"}      | ${"11:00am"}
    `("should show inputTime in 12 hour clock format when it is between 1 and 2 hours ago ($expected)",
    ({inputTime, expected}) => {
      const fakeNow = "January 01, 2020 12:00:00";
      fakeDate(fakeNow);

      component.timestamp = getUnixTime(new Date(inputTime));

      fixture.detectChanges();
      const timeSpan = fixture.debugElement.query(By.css(".time"));

      expect(timeSpan.nativeElement.textContent).toBe(expected);
  });

  it.each([
    "January 01, 2020 09:00:00",
    "January 01, 2020 13:00:00"
  ])("should not show time when it is more than 2 hours ago or in the future (%s)",
    (inputTime) => {
      const fakeNow = "January 01, 2020 12:00:00";
      fakeDate(fakeNow);
      component.timestamp = getUnixTime(new Date(inputTime));

      fixture.detectChanges();
      const time = fixture.debugElement.query(By.css(".time"));
      const separatorSpan = fixture.debugElement.query(By.css(".separator"));

      expect(time).toBeFalsy();
      expect(separatorSpan).toBeFalsy();
    });

  it("should show the separator on the left when specified", () => {
    // 20 minutes ago
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
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
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
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
    component.timestamp = getUnixTime(sub(new Date(), { minutes: 20 }));
    component.separator = undefined;

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css(".time"));
    const separatorSpan = fixture.debugElement.query(By.css(".separator"));
    expect(time.nativeElement.textContent).toBe("20 min ago");
    expect(separatorSpan).toBeFalsy();
  });

  it("should set text color", () => {
    component.textColor = "white";

    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css(".time"));

    expect(div.nativeElement.style.color).toBe("white");
  });
});
