import { TestBed } from '@angular/core/testing';

import { MetaTagsService } from './meta-tags.service';
import { MetaService } from '@ngx-meta/core';
import { mockService } from '../mocks/MockService';

describe('MetaTagsService', () => {
  let meta: MetaService;
  let metaService: MetaTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MetaService,
          useClass: mockService(MetaService)
        }
      ]
    });

    meta = TestBed.get(MetaService);
    metaService = TestBed.get(MetaTagsService);
  });

  it('should be created', () => {
    const service: MetaTagsService = TestBed.get(MetaTagsService);
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: MetaTagsService = TestBed.get(MetaTagsService);
    expect(service).toBeTruthy();
  });

  it('should create the social meta tags', () => {
    const mockTags = [
      {
        name: 'fb:app_id',
        content: '207633159308175'
      },
      {
        name: 'fb:pages',
        content: '21253884267'
      }
    ];

    metaService.getSocialMetaTags = jest.fn();
    (metaService.getSocialMetaTags as jest.Mock).mockReturnValue(mockTags);
    jest.spyOn(metaService, 'setTags');
    metaService.setup();
    expect(metaService.setTags).toBeCalledWith(mockTags);
    expect(meta.setTag).toBeCalledTimes(2);
  });
});
