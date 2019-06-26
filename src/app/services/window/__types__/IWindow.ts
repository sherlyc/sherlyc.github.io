import { IDigitalData } from '../../analytics/__types__/IDigitalData';
import { IPlayer } from '../../../content-blocks/video-unit/__types__/IPlayer';
import { IStuffLogin } from '../../authentication/__types__/IStuffLogin';

export interface IWindow {
  digitalData: IDigitalData;
  _satellite: {
    pageBottom: () => void;
  };
  videojs: (element: HTMLElement) => IPlayer;
  StuffLogin: IStuffLogin;
}
