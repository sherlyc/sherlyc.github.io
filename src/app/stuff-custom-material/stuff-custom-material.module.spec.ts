import { StuffCustomMaterialModule } from './stuff-custom-material.module';

describe('StuffCustomMaterialModule', () => {
  let stuffCustomMaterialModule: StuffCustomMaterialModule;

  beforeEach(() => {
    stuffCustomMaterialModule = new StuffCustomMaterialModule();
  });

  it('should create an instance', () => {
    expect(stuffCustomMaterialModule).toBeTruthy();
  });
});
