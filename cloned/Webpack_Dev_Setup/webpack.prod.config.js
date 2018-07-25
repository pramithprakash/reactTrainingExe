const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const minCSSExtractLoaderPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(baseConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    minCSSExtractLoaderPlugin.loader,
                    'css-loader'
                ]
            }
            
        ]
    },
    plugins: [
        new minCSSExtractLoaderPlugin({
            filename: '[name].css',
            chunkFileName: '[id].css'
        }),
        new uglifyJsPlugin({
            sourceMap: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ],
    mode: 'production'
})