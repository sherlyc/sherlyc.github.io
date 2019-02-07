import { getTestBed, TestBed } from '@angular/core/testing';
import { ContentRetrieverService } from '../content-retriever.service';
import * as jsonfeed from './fixtures/contentBlockArticles.json';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ContentRetrieverService', () => {
  let injector: TestBed;
  let contentRetrieverService: ContentRetrieverService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    injector = getTestBed();
    contentRetrieverService = injector.get(ContentRetrieverService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should fetch article data correctly', (done) => {
    contentRetrieverService.getContent().subscribe((response) => {
      expect(response).toEqual(jsonfeed);
      done();
    });

    const req = httpMock.expectOne(environment.backendUrl);
    expect(req.request.method).toBe('GET');
    req.flush(jsonfeed);
  });

  it('should handle errors correctly', (done) => {
    contentRetrieverService.getContent().subscribe(
      (response) => {
        fail();
      },
      (err) => {
        expect(err).toEqual('Something bad happened; please try again later.');
        done();
      }
    );

    const req = httpMock.expectOne(environment.backendUrl);
    expect(req.request.method).toBe('GET');
    req.flush(
      { data: 'something went wrong' },
      { status: 500, statusText: 'Server error' }
    );
  });

  it('should return an error content block when fails', (done) => {
    contentRetrieverService.getContent().subscribe(
      (response) => {
        // expect(response).toContain(jest)
        fail();
      },
      (err) => {
        fail(err);
      }
    );

    const req = httpMock.expectOne(environment.backendUrl);
    expect(req.request.method).toBe('GET');
    req.flush(
      { data: 'something went wrong' },
      { status: 500, statusText: 'Server error' }
    );
  });
});
