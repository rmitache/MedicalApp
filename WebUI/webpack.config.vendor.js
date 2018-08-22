const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Modules
const treeShakableModules = [
    '@angular/animations',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    'zone.js',
    'chart.js',
    'chartjs-plugin-annotation'
];
const nonTreeShakableModules = [
    'primeng/primeng',
    'primeng/resources/themes/omega/theme.css',
	//'primeng/resources/themes/flick/theme.css',
	//'primeng/resources/themes/cupertino/theme.css',
    'font-awesome/css/font-awesome.min.css',
    'primeng/resources/primeng.min.css',
    'es6-promise',
    'es6-shim',
    'event-source-polyfill'
];
const allModules = treeShakableModules.concat(nonTreeShakableModules);



module.exports = (env) => {

    // Variables
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);

    // Configuration
    const vendorConfig = {
        entry: {
            // To keep development builds fast, include all vendor dependencies in the vendor bundle.
            // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
            vendor: isDevBuild ? allModules : nonTreeShakableModules
        },
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'wwwroot', 'Vendor'),
            publicPath: 'Vendor/',
            library: '[name]_[hash]'
        },
        module: {
            rules: [
                { test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './SPA')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './SPA')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100 
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'Vendor', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    };




    return [vendorConfig];
}
