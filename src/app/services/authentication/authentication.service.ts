import { Injectable } from '@angular/core';
import { RuntimeService } from '../runtime/runtime.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ConfigService } from '../config/config.service';
import { Position } from '../script-injector/__types__/Position';
import { WindowService } from '../window/window.service';
import { IStuffLogin } from './__types__/IStuffLogin';
import { Subject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private runtime: RuntimeService,
    private scriptInjectorService: ScriptInjectorService,
    private config: ConfigService,
    private window: WindowService,
    private analyticsService: AnalyticsService
  ) {}

  StuffLogin!: IStuffLogin;

  authenticationStateChange = new Subject<any>();

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }

    await this.injectScript();
    this.initialiseLibrary();
  }

  private async injectScript() {
    await this.scriptInjectorService.load(
      ScriptId.loginSdk,
      this.config.getConfig().loginLibrary.libraryUrl,
      Position.HEAD,
      false
    );

    this.StuffLogin = this.window.getWindow().StuffLogin;
  }

  private initialiseLibrary() {
    const {
      clientId,
      signinRedirectPath,
      authProvider
    } = this.config.getConfig().loginLibrary;

    const hostname = this.window.getWindow().location.hostname;

    const redirect_uri =
      hostname === 'localhost'
        ? `http://${hostname}:4000${signinRedirectPath}`
        : `https://${hostname}${signinRedirectPath}`;

    this.StuffLogin.init({
      client_id: clientId,
      redirect_uri,
      authority: authProvider
    });

    this.registerAuthStateCallbacks();
  }

  private registerAuthStateCallbacks() {
    this.StuffLogin.onLogin((user) => {
      this.analyticsService.setUserInDataLayer(user);
      this.authenticationStateChange.next(user);
    });

    this.StuffLogin.onLogout(() => {
      this.analyticsService.setUserInDataLayer(null);
      this.authenticationStateChange.next(null);
    });
  }

  login() {
    this.StuffLogin.login();
  }

  async signinCallback() {
    await this.injectScript();
    this.StuffLogin.signinCallback();
  }
}
