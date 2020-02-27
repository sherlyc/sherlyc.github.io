import { IWindow } from "./IWindow";

export interface IWindowService {
  getWindow(): IWindow & Window;
  isDesktopDomain(): boolean;
}
