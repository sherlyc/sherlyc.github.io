import { Observable } from 'rxjs';
import { IPage } from '../../../../common/__types__/IPage';

export class ContentRetrieverServiceMock {
  getContent: jest.Mock<Observable<IPage>> = jest.fn();
}
