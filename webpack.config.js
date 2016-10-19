var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var bower_components = path.resolve(__dirname, 'bower_components');

var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var pathToJQuery = path.resolve(bower_components, 'jquery/dist/jquery.min.js');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var extractTextPlugin = new ExtractTextPlugin("../style/[name].css")

module.exports = {
    plugins: [
      commonsPlugin,
      extractTextPlugin
    ],
    entry: {
        index : './src/js/main'
    },
    output: {
        path: 'public/wwwroot/script',
        filename: '[name].js'
    },
    module: {
       loaders: [
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              loader: 'babel',
              query:
                {
                  presets:['react']
                }
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.less$/,
              exclude: /node_modules/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
              test: /\.(png|jpg)$/,
              exclude: /node_modules/,
              loader: 'url?limit=8192'
            }
        ],
        noParse: [pathToReact, pathToJQuery]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias:{
          'jQuery': pathToJQuery,
          'react': pathToReact,
          'react-dom': pathToReactDom
        }
    }
};
