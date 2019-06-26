import { Injectable } from '@angular/core';
import { RuntimeService } from '../runtime/runtime.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ConfigService } from '../config/config.service';
import { Position } from '../script-injector/__types__/Position';
import { WindowService } from '../window/window.service';
import { IStuffLogin } from './__types__/IStuffLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private runtime: RuntimeService,
    private scriptInjectorService: ScriptInjectorService,
    private config: ConfigService,
    private window: WindowService
  ) {}

  StuffLogin!: IStuffLogin;

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }
    await this.scriptInjectorService.load(
      ScriptId.loginSdk,
      this.config.getConfig().loginLibrary.libraryUrl,
      Position.HEAD,
      true
    );

    this.initialiseLibrary();
  }

  private initialiseLibrary() {
    const {
      clientId,
      signinRedirectPath,
      authProvider
    } = this.config.getConfig().loginLibrary;

    this.StuffLogin = this.window.getWindow().StuffLogin;
    this.StuffLogin.init({
      client_id: clientId,
      redirect_uri: `https://${
        this.window.getWindow().location.hostname
      }/${signinRedirectPath}`,
      authority: authProvider
    });
  }

  login() {
    this.StuffLogin.login();
  }
}
