const config = require("./config.json");
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { RuntimeService } from "../runtime/runtime.service";
import { IEnvironmentDefinition } from "./__types__/IEnvironmentDefinition";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  constructor(private runtime: RuntimeService) {}

  private parseUrlVersion(
    environmentConfig: IEnvironmentDefinition & { [key: string]: any }
  ) {
    Object.keys(environmentConfig).forEach((configKey) => {
      const configValue = environmentConfig[configKey];
      if (
        typeof configValue === "string" &&
        configValue.includes("{{version}}")
      ) {
        environmentConfig[configKey] = configValue
          .split("{{version}}")
          .join(environment.version);
      }
    });
  }

  getConfig(): IEnvironmentDefinition {
    const environments: { [key: string]: IEnvironmentDefinition } = config;

    const environmentName = this.runtime.getEnvironmentVariable(
      "SPADE_ENV",
      "production"
    );

    const environmentConfig =
      environments[environmentName] || environments["production"];

    this.parseUrlVersion(environmentConfig);
    return environmentConfig;
  }
}
