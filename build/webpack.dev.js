const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV;
const packager = require(path.resolve(__dirname, '../package.json'));
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    entry: {
        test: path.resolve(__dirname, '../src/test/index.js')
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: false,
        noInfo: true,
        overlay: true,
        publicPath: '/',
        disableHostCheck: true,
        host: '0.0.0.0',
        contentBase: './dist-dev'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Also generate a test.html
            filename: 'index.html',
            template: 'template/static.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${ENV}"`,
                _VERSION_: `"${packager.version}"`
            }
        })
    ]
});
