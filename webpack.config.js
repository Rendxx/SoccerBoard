var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var extractTextPlugin = new ExtractTextPlugin("../style/[name].css");
var root = path.resolve(__dirname);
var minimize = process.argv.indexOf('--optimize-minimize') !== -1;

var setting = {
    plugins: [
      commonsPlugin,
      extractTextPlugin
    ],
    entry: {
        soccerBoard : './src/js/Main'
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
              loader: 'url-loader'
            },
            {
              test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
              exclude: /node_modules/,
              loader : 'file-loader?name=../style/[name].[ext]'
            }
        ],
        noParse: [pathToReact]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias:{
          'react': pathToReact,
          'react-dom': pathToReactDom,
          'BOWER': root+'/bower_components',
          'MODULE': root+'/src/js/module',
          'PANEL': root+'/src/js/panel',
          'COMPONENT': root+'/src/js/component',
          'TEAM': root+'/src/js/team',
          'JS': root+'/src/js',
          'LESS': root+'/src/less',
          'IMAGE': root+'/src/image',
        }
    }
};

if (minimize) setting.entry = {
    'soccerBoard.min' : './src/js/Main'
}
module.exports = setting;
