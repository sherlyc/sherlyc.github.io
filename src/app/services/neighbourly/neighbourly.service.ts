import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { Position } from "../script-injector/__types__/Position";
import { Injectable } from "@angular/core";
import { LoggerService } from "../logger/logger.service";

@Injectable({
  providedIn: "root"
})
export class NeighbourlyService {
  constructor(
    private runtimeService: RuntimeService,
    private logger: LoggerService,
    private scriptInjectorService: ScriptInjectorService
  ) {}

  async setup() {
    if (this.runtimeService.isServer()) {
      return;
    }

    const localStoriesScriptLoad = this.scriptInjectorService.load(
      ScriptId.neighbourlyLocalStories,
      "https://cdn.neighbourly.co.nz/js/neighbourly-stuff-strap.js",
      Position.BOTTOM
    );

    const topStoriesScriptLoad = this.scriptInjectorService.load(
      ScriptId.neighbourlyTopStories,
      "https://cdn.neighbourly.co.nz/js/neighbourly-stuff-widget-init.js",
      Position.BOTTOM
    );

    try {
      await Promise.all([localStoriesScriptLoad, topStoriesScriptLoad]);
    } catch (e) {
      this.logger.error(e, "NeighbourlyService - script loading error");
    }
  }
}
