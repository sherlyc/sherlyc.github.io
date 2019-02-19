import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { Observable } from 'rxjs';

export class ContentRetrieverServiceMock {
  getContent: jest.Mock<Observable<IContentBlock[]>> = jest.fn();
}
