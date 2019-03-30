import { ConfigService } from './config.service';
import { AutoMock, AutoMocked } from '../../../../common/__types__/types';

export class ConfigServiceMock implements AutoMock<ConfigService> {
  getConfig: AutoMocked<ConfigService['getConfig']> = jest.fn();
}
