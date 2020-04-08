import { IEnvironmentDefinition } from "./__types__/IEnvironmentDefinition";

const config = require("./config.json");

const environments: { [key: string]: IEnvironmentDefinition } = config;
const defaultEnvironmentName = "development";
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;
export default environments[environmentName] || environments["development"];
