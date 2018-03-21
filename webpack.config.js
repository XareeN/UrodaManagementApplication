const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/main/js/Index.jsx']
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    resolve: {
        // Look for modules in .ts(x) files first, then .js(x)
        extensions: ['.ts', '.tsx', '.js', '.jsx']
        // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: /(node_modules)/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                //     {
                //     loader: "style-loader" // creates style nodes from JS strings
                // },
                {
                    loader: 'css-loader',
                }
            ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.exec\.js$/,
                use: [ 'script-loader' ]
            }
        ],

    },
    plugins: [
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new WebpackNotifierPlugin({alwaysNotify: true}),
        //TODO usun to pozniej kiedys tam
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: true,
                warnings: false
            }
        })
        //TODO ^ to usun
    ],
    watch: true

};
