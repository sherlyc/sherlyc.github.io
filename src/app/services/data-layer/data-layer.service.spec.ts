import { TestBed } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';

declare const window: {
  digitalData: any;
};

describe('DataLayerService', () => {
  let service: DataLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(DataLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should assign digitalData object to the window', () => {
    service.setup();
    expect(window.digitalData).toBeTruthy();
  });
});
