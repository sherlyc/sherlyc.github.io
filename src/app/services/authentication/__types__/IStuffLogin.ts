import { IStuffLoginUser } from "./IStuffLoginUser";

interface IStuffLoginConfig {
  client_id: string;
  redirect_uri: string;
  authority: string;
}

export interface IStuffLogin {
  init: (config: IStuffLoginConfig) => void;
  login: () => void;
  signinCallback: () => void;
  getUser: () => Promise<IStuffLoginUser>;
  onLogout: (p: () => void) => void;
  onLogin: (param: (user: IStuffLoginUser) => void) => void;
}
