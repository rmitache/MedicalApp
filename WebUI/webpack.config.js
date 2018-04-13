const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => {

    // Variables
    const extractCSS = new ExtractTextPlugin('globalStyles.css');
    const isDevBuild = !(env && env.prod);
    const outputDir = './wwwroot';

    // Configuration
    const config = {
        entry: {
            'Pages/HomePage/homepage': './SPA/Components/Pages/HomePage/main.ts'
        },
        stats: { modules: false },
        context: __dirname,
        resolve: {
            modules: [path.resolve(__dirname, "./"), "node_modules"],
            extensions: ['.js', '.ts']
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, outputDir),
            publicPath: 'wwwroot/' // Webpack dev middleware, if enabled, handles requests for this URL prefix // <----- Not sure about this 
        },
        module: {
            rules: [
                { test: /\.ts$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader'/*, 'angular-router-loader'*/] : '@ngtools/webpack' },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'],
                    include: [
                        path.resolve(__dirname, 'SPA/Components'),
                        path.resolve(__dirname, 'SPA/Core')
                    ],
                },
                {
                    test: /\.css(\?|$)/,
                    use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }),
                    include: [
                        path.resolve(__dirname, 'SPA/Content')
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    loader: require.resolve("file-loader") + "?name=Images/[name].[ext]"
                } 
            ]
        },
        plugins: [

            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/Vendor/vendor-manifest.json')
            }),
            extractCSS,
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(outputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ]

    };


    return [config];
};


