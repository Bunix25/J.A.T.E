// Import necessary libraries and modules
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML Webpack Plugin
const WebpackPwaManifest = require("webpack-pwa-manifest"); // Webpack PWA Manifest
const { InjectManifest } = require("workbox-webpack-plugin"); // Workbox Webpack Plugin
const path = require("path"); // Node.js path module
const WorkboxPlugin = require("workbox-webpack-plugin"); // Workbox Webpack Plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Mini CSS Extract Plugin

// Export a function that returns the Webpack configuration
module.exports = () => {
  return {
    // Set the mode to development
    mode: "development",

    // Set the entry points for the application
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    // Set the output path and filename
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    // Set the plugins for the application
    plugins: [
      // HTML Webpack Plugin
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),

      // Mini CSS Extract Plugin
      new MiniCssExtractPlugin(),

      // Workbox Inject Manifest Plugin
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Webpack PWA Manifest Plugin
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "offline text editor",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // Set the rules for the application
    module: {
      rules: [
        {
          // Load CSS files
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // Load image files
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          // Load JavaScript files
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};

