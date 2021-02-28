const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { gasket1: './Chap2/gasket1.ts' },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['gasket1'],
            template: './Chap2/gasket1-ts.html',
            filename: 'gasket1.html',
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
