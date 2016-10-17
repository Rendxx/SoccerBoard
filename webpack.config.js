var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [commonsPlugin],
    entry: {
        index : './src/js/main.js'
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
              loader: "babel",
              query:
                {
                  presets:['react']
                }
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              loader: 'style!css'
            },
            {
              test: /\.less$/,
              exclude: /node_modules/,
              loader: 'style!css!less'
            },
            {
              test: /\.(png|jpg)$/,
              exclude: /node_modules/,
              loader: 'url?limit=8192'
            }
        ],
        noParse: [pathToReact]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias:{
          'react': pathToReact,
          'react-dom': pathToReactDom
        }
    }
};
