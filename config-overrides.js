const { override } = require("customize-cra");
const path = require("path");

module.exports = override((config) => {
  config.optimization.runtimeChunk = false;
  // config.output.path = path.join(__dirname, "src", "build");

  return config;
});
