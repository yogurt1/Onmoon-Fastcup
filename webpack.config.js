const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

// TODO: Env opts
module.exports = ({
} = {}) => {
    const rules = [
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpe?g|woff2?|gif|ttf|eot|svg)$/,
            loader: 'url-loader',
            options: { limit: 10240 },
        }
    ]

    const plugins = [
        new HtmlPlugin({
            template: path.resolve('./app/index.html')
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: "",
        })
    ]

    const config = {
        entry: {
            app: ['./app/main.jsx'],
        },
        output: {
            path: path.resolve('./build'),
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js',
            publicPath: '/',
        },
        resolve: {
            alias: {
                app: path.resolve('./app')
            }
        },
        plugins,
        module: { rules }
    }

    if (process.env.NODE_ENV !== 'production') {
        config.devtool = 'inline-source-map'
        config.entry.app.unshift(
            'webpack-hot-middleware/client'
        )
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        )
    } else {
        config.devtool = 'source-map'
    }

    return config
}
