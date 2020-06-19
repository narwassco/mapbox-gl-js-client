const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new webpack.ProvidePlugin({
        Promise: 'es6-promise',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ],
        },
        ],
    },
    devServer: {
        contentBase: __dirname + '/dist',
        publicPath: '/',
        watchContentBase: true,
        open: true
    }
};