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
import { IStuffLoginUser } from './__types__/IStuffLoginUser';

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
  authenticationStateChange = new Subject<IStuffLoginUser>();

  private async injectScript() {
    await this.scriptInjectorService.load(
      ScriptId.loginSdk,
      this.config.getConfig().loginLibrary.libraryUrl,
      Position.HEAD,
      false
    );

    this.StuffLogin = this.window.getWindow().StuffLogin;
  }

  private async initialiseLibrary() {
    const {
      clientId,
      signinRedirectPath,
      authProvider
    } = this.config.getConfig().loginLibrary;

    const protocol = this.window.getWindow().location.protocol;
    const host = this.window.getWindow().location.host;

    const redirect_uri = `${protocol}//${host}${signinRedirectPath}`;

    this.StuffLogin.init({
      client_id: clientId,
      redirect_uri,
      authority: authProvider
    });
  }

  private async processCurrentAuthState() {
    const userLoggedIn = await this.StuffLogin.getUser();
    if (userLoggedIn) {
      this.processLoggedInUser(userLoggedIn);
    } else {
      this.processLoggedOutUser();
    }
  }

  private registerAuthStateChangeCallbacks() {
    this.StuffLogin.onLogin((user: IStuffLoginUser) => {
      this.processLoggedInUser(user);
    });

    this.StuffLogin.onLogout(() => {
      this.processLoggedOutUser();
    });
  }

  private processLoggedInUser(user: IStuffLoginUser) {
    this.analyticsService.setUserInDataLayer(user);
    this.authenticationStateChange.next(user);
  }

  private processLoggedOutUser() {
    this.analyticsService.setUserInDataLayer(null);
    this.authenticationStateChange.next(undefined);
  }

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }

    await this.injectScript();
    await this.initialiseLibrary();
    this.registerAuthStateChangeCallbacks();
    await this.processCurrentAuthState();
  }

  login() {
    this.StuffLogin.login();
  }

  async signinCallback() {
    await this.injectScript();
    this.StuffLogin.signinCallback();
  }
}
