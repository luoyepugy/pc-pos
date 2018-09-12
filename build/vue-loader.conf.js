'use strict'
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    // extract: isProduction,
    extract: true,
    // scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
    // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  cssModules: {
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    camelCase: true
  }
}
