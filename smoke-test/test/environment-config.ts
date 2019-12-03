import * as dotenv from "dotenv";
dotenv.config();

interface IEnvironmentConfig {
  url: string;
}

export default {
  url: process.env.URL || "http://localhost:4000/"
} as IEnvironmentConfig;
