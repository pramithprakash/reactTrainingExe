    /* prod config
        uglifyJSPlugin
        MiniCssExtractPlugin */

const path = require('path');
const HhtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
module.exports = merge(baseConfig, {
    devtool:'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true,
    mode: 'development'
});

