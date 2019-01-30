var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SERVER: '"http://cs.lewan6.ren/api/"',
  BASE_SERVER: '"http://cs.lewan6.ren/"'
})
