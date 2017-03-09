const path = require('path')
const webpack = require('webpack')

module.exports = () => {
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
        new EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: undefined,
        })
    ]

    const config = {
        entry: {
            app: ['./app/main.jsx'],
        },
        output: {
            path: path.resolve('./build'),
            publicPath: '/',
        },
        plugins,
        module: { rules }
    }

    return config
}
