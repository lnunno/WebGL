const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    entry: { hello: './Chap3/hello.ts', gasket1: './Chap2/gasket1.ts', square1: './Chap3/square1.ts' },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['hello'],
            template: './Chap3/hello.html',
            filename: 'hello.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['gasket1'],
            template: './Chap2/gasket1-ts.html',
            filename: 'gasket1.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['square1'],
            template: './Chap3/square1-ts.html',
            filename: 'square1-ts.html',
        }),
    ],
    devtool: 'inline-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
