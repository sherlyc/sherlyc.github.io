import { TestBed } from '@angular/core/testing';
import { GlobalCssService } from './global-css.service';

describe('Cxs service', function() {
  let globalCssService: GlobalCssService;
  beforeEach(() => {
    globalCssService = TestBed.get(GlobalCssService);
  });

  it('should be created', function() {
    expect(globalCssService).toBeTruthy();
  });
});
