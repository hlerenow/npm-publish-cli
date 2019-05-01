const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    entry: {
        test: path.resolve(__dirname, '../src-static/index.js')
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
        })
    ]
});
