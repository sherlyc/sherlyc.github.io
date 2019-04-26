import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageLinkUnitComponent } from './image-link-unit.component';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('ImageLinkUnitComponent', () => {
  let component: ImageLinkUnitComponent;
  let fixture: ComponentFixture<ImageLinkUnitComponent>;

  const articleData: IImageLinkUnit = {
    type: ContentBlockType.ImageLinkUnit,
    indexHeadline: 'Dummy Headline',
    linkUrl: 'https://dummyurl.com',
    imageSrc: 'https://dummyimagesrc.com',
    headlineFlags: []
  };

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ImageLinkUnitComponent]
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLinkUnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input data', async () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector('a');

    expect(a!.getAttribute('href')).toEqual(articleData.linkUrl);

    const h3 = componentElement.querySelector('h3');
    expect(h3!.textContent).toEqual(articleData.indexHeadline);

    const img = componentElement.querySelector('img');
    expect(img!.getAttribute('src')).toEqual(articleData.imageSrc);
    expect(img!.getAttribute('alt')).toEqual(articleData.indexHeadline);
  });
});
