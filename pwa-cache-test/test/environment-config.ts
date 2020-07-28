import * as dotenv from "dotenv";
dotenv.config();

interface IEnvironmentConfig {
  url: string;
  spadeVersion: string;
}

export default {
  url: process.env.URL || "http://localhost:4000/",
  spadeVersion: process.env.VERSION || "SNAPSHOT"
} as IEnvironmentConfig;
