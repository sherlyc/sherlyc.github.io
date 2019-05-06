import { Injectable } from '@angular/core';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { Position } from '../script-injector/__types__/Position';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class DtmService {
  constructor(
    private scriptInjectorService: ScriptInjectorService,
    private config: ConfigService
  ) {}

  setup() {
    this.scriptInjectorService.load(
      ScriptId.dtm,
      this.config.getConfig().dtmUrl,
      Position.HEAD
    );
  }
}
