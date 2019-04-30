const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV;
const packager = require(path.resolve(__dirname, '../package.json'));

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        test: path.resolve(__dirname, '../src/test/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist-dev'),
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: '[name]'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
                    formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
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
};
