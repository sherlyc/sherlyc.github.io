import { AutoMock, AutoMocked } from '../../../../common/__types__/types';
import { AdService } from './ad.service';

export class AdServiceMock implements AutoMock<AdService> {
  setupAds: AutoMocked<AdService['setupAds']> = jest.fn();
}
