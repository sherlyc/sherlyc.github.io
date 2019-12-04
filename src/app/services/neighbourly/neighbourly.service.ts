import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { Position } from "../script-injector/__types__/Position";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NeighbourlyService {
  constructor(
    private runtimeService: RuntimeService,
    private scriptInjectorService: ScriptInjectorService
  ) {}

  async setup() {
    if (this.runtimeService.isBrowser()) {
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

      await Promise.all([localStoriesScriptLoad, topStoriesScriptLoad]);
    }
  }
}
