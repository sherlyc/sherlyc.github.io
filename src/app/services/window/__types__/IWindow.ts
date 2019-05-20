import { IDigitalData } from '../../analytics/__types__/IDigitalData';

export interface IWindow {
  digitalData: IDigitalData;
  _satellite: {
    pageBottom: () => void;
  };
  videojs: () => void;
}


