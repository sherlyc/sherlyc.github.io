import { Injectable } from '@angular/core';
import { RuntimeService } from '../runtime/runtime.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ConfigService } from '../config/config.service';
import { Position } from '../script-injector/__types__/Position';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private runtime: RuntimeService,
              private scriptInjectorService: ScriptInjectorService,
              private config: ConfigService) {
  }

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }
    await this.scriptInjectorService.load(
      ScriptId.loginSdk,
      this.config.getConfig().user.loginLibrary.libraryUrl,
      Position.HEAD,
      true
    );
  }

  login() {

  }
}
