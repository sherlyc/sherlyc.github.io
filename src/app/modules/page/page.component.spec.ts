import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../../shared/stuff-custom-material/stuff-custom-material.module';
import { PageComponent } from './page.component';
import { ContentBlockComponent } from '../../content-blocks/content-block/content-block.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StuffCustomMaterialModule],
      declarations: [PageComponent, ContentBlockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
