const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise',
        }),
        new Dotenv()
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
    devtool: 'inline-source-map',
    devServer: {
        watchContentBase: true,
        contentBase: './dist',
    },
    externals: {
        'mapbox-gl': 'mapboxgl'
    }
};