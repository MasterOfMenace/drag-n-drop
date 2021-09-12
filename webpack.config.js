const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MODE = {
  PROD: "production",
  DEV: "development",
};

const getFileName = (ext) => `[name].[hash].${ext}`;

const getOutputConfig = (mode) => ({
  filename: getFileName("js"),
  path: path.resolve(__dirname, "build"),
  publicPath: "/",
});

const getHtmlWebpackPluginOptions = () => ({
  filename: "index.html",
  title: "Drag-n-Drop",
  template: "src/template.html",
  hash: true,
  path: path.resolve(__dirname, "public"),
});

const getMinimizeOptions = (mode) => mode === MODE.PROD;

module.exports = (env, argv) => {
  const mode = argv.mode || MODE.DEV;
  console.log(mode);

  const config = {
    mode,
    entry: "./src/index.ts",
    output: getOutputConfig(mode),
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },

    devServer: {
      static: path.join(__dirname, "public"),
      open: false,
      port: 4200,
      historyApiFallback: true,
      devMiddleware: {
        publicPath: "/",
      },
    },

    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.ts?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
          exclude: "/node_modules/",
        },
      ],
    },

    plugins: [new HtmlWebpackPlugin(getHtmlWebpackPluginOptions())],

    devtool: mode === MODE.DEV ? "source-map" : false,

    optimization: {
      minimize: getMinimizeOptions(mode),
      splitChunks: {
        chunks: "all",
      },
    },
  };

  return config;
};
