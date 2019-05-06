const webpack = require('./build/webpack.dev');
delete webpack.entry;
delete webpack.output;
module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            { pattern: 'test/unit/**/*.test.js', watched: true }
        ],
        webpack: webpack,
        preprocessors: {
            'test/unit/**/*.test.js': ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false
        // client: {
        //     mocha: {
        //         // change Karma's debug.html to the mocha web reporter
        //         reporter: 'html',
        //         reporterOption: {
        //             reportDir: './testReport/unit'
        //         },
        //         require: '@babel/register'
        //     }
        // }

        // preprocessors: {
        //     'test/unit/*.test.js': [ 'webpack' ]
        // },
    });
};
