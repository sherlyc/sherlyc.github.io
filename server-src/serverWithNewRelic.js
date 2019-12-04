/**
 * This is a workaround for new relic with webpack.
 * Please follow the discussion here https://discuss.newrelic.com/t/please-officially-support-webpack/58585
 */
if (process.env.NEW_RELIC_LICENSE_KEY) {
  global.newrelic = require("newrelic");
}
require("./main");
