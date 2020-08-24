const fs = require("fs");
const path = require('path');

module.exports = {
  syntax: "postcss-scss",
  parser: "postcss-scss",
  plugins: [
    require("postcss-easy-import")({
      extensions: [".css", ".scss"]
    }),
    require("autoprefixer")({
      cascade: false
    }),
    require("postcss-advanced-variables")({
      variables: JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./src/assets/styles/variables.json"), "utf-8")
      ),
      importPaths: [path.resolve(__dirname, "./src/assets/styles/variables.json")],
      resolve: true
    }),
    require("postcss-nested"),
    require("postcss-hexrgba"),
    require("postcss-rgb"),
    require("postcss-color-function"),
    require("postcss-inline-svg")({
      removeFill: true,
      path: path.resolve(__dirname, "./src/assets/images/icons")
    }),
    require("postcss-svgo"),
    require("cssnano")()
  ]
};
