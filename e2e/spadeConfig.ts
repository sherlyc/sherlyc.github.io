import { IEnvironmentDefinition } from "./__types__/IEnvironmentDefinition";

const config = require("./config.json");

const environments: { [key: string]: IEnvironmentDefinition } = config;
const defaultEnvironmentName = "localhost";
const environmentName = process.env.BS_ENV || defaultEnvironmentName;
export default environments[environmentName] ||
  environments[defaultEnvironmentName];
