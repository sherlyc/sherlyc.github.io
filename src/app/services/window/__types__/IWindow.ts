import { IDigitalData } from '../../data-layer/__types__/IDigitalData';

export interface IWindow {
  digitalData: IDigitalData;
  _satellite: {
    pageBottom: () => void;
  };
}
