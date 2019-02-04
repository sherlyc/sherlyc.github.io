import { TestBed } from '@angular/core/testing';

import { ContentRetrieverService } from '../content-retriever.service';
import axios from 'axios';
import * as jsonfeed from './fixtures/contentBlockArticles.json';
jest.mock('axios');

describe('ContentRetrieverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should fetch article data', () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });

    const service: ContentRetrieverService = TestBed.get(
      ContentRetrieverService
    );

    service.getContent().subscribe((response) => {
      expect(response).toEqual(jsonfeed);
    });
  });
});
