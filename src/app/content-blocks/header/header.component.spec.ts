import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
  });

  it('should display navigation when hamburger menu is clicked', () => {
    fixture.detectChanges();

    let navigation = fixture.debugElement.query(By.css('.navigation'));
    expect(navigation).toBeFalsy();

    fixture.componentInstance.toggleMenu();
    fixture.detectChanges();

    navigation = fixture.debugElement.query(By.css('.navigation'));
    expect(navigation).toBeTruthy();
  });
});
