const http = require('http')
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')

const { PORT = 3000 } = process.env
const devServer = express()
const compiler = webpack(webpackConfig({}))
const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: { colors: true }
})

const indexHtmlPath = path.join(__dirname, './build/index.html')
if (process.env.NODE_ENV === 'production') {
    devServer
        .use(express.static(path.join(__dirname, 'build')))
        .get('*', (req, res, next) => {
            res.sendFile(path.join(__dirname, indexHtmlPath))
        })
} else {
    devServer
        .use(devMiddleware)
        .use(webpackHotMiddleware(compiler))
        .get('*', (req, res, next) => {
            const file = devMiddleware.fileSystem.readFileSync(indexHtmlPath)
            res.send(file)
        })
}

const server = new http.Server()
    .on("request", devServer)
    .on("listening", () => console.log(`Webpack listening on port ${PORT}`))
    .listen(PORT)
