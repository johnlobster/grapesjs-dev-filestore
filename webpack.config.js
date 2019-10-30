const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const name = pkg.name;
let plugins = [];

const isProd = false;
// console.log("Webpack env");
// console.log(env);

const index = 'index.html';
const indexDev = '_' + index;
const htmlTemplate = fs.existsSync(indexDev) ? indexDev : index

console.log("Using HTML template " + htmlTemplate);

const mode = isProd ? 'production' : 'development';
module.exports = {
  
  entry: './src',
  mode: mode,
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    port: 8001
  },
  output: {
    path: path.resolve(__dirname),
    filename: `dist/${name}.min.js`,
    library: name,
    libraryTarget: 'umd',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: /src/,
    }],
  },
  externals: {'grapesjs': 'grapesjs'},
}

// if (isProd) {
  //   plugins = [
  //     new webpack.BannerPlugin(`${name} - ${pkg.version}`),
  //   ]
  // } else {
  //   plugins.push(new HtmlWebpackPlugin({
  //     template: htmlTemplate
  //   }));
  // }
