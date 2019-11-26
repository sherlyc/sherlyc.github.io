import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { GlobalStyleDirective } from '../shared/directives/global-style/global-style.directive';
import { GridContainerComponent } from './grid-container.component';

describe('GridContainerComponent', () => {
  let component: GridContainerComponent;
  let fixture: ComponentFixture<GridContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalStyleDirective, GridContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GridContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies the grid configuration', () => {
    component.input = {
      type: ContentBlockType.GridContainer,
      content: [],
      mobile: { gridTemplateColumns: '1fr', gridGap: '20px', gridBlocks: [] },
      tablet: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px',
        gridBlocks: []
      },
      desktop: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 200px',
        gridGap: '20px',
        gridBlocks: []
      }
    };
    fixture.detectChanges();
    expect(fixture.componentInstance.style).toMatchInlineSnapshot(`
      Object {
        "@media only screen and (min-width: 64em)": Object {
          "display": "grid",
          "gridGap": "20px",
          "gridTemplateColumns": "1fr 1fr 1fr 1fr",
        },
        "@media only screen and (min-width: 75em)": Object {
          "display": "grid",
          "gridGap": "20px",
          "gridTemplateColumns": "1fr 1fr 1fr 1fr 200px",
        },
        "display": "grid",
        "gridGap": "20px",
        "gridTemplateColumns": "1fr",
      }
    `);
  });
});
