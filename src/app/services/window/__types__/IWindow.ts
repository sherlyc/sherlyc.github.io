import { IDigitalData } from '../../analytics/__types__/IDigitalData';
import { IStuffLogin } from '../../authentication/__types__/IStuffLogin';

export interface IWindow {
  digitalData: IDigitalData;
  _satellite: {
    pageBottom: () => void;
  };
  nol_t: (config: {
    cid: string;
    content: string;
    server: string;
  }) => {
    record: () => {
      post: () => void;
    };
  };
  StuffLogin: IStuffLogin;
}
