var path = require("path");

module.exports = env => {
  return {
    entry: "./src/main/javascript/index.js",
    devtool: "inline-source-map",
    cache: false,
    mode: "development",
    output: {
      path: __dirname + "/src/main/resources/static",
      filename: "./js/bundle.js",
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "/img",
                publicPath: "/img/",
                name: "[name].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};
