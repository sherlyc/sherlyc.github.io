import { AutoMock, AutoMocked } from '../../../../common/__types__/types';
import { ContentRetrieverService } from './content-retriever.service';

export class ContentRetrieverServiceMock
  implements AutoMock<ContentRetrieverService> {
  getContent: AutoMocked<ContentRetrieverService['getContent']> = jest.fn();
}
