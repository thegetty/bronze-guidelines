//
// CUSTOMIZED FILE -- Bronze Guidelines
// added def and warn shortcodes
//
const addComponentTag = require('../../_plugins/components/addComponentTag')
const annoref = require('./annoref')
const backmatter = require('./backmatter')
const bibliography = require('./bibliography')
const cite = require('./cite')
const contributors = require('./contributors')
const def = require('./def')
const figure = require('./figure')
const figureGroup = require('./figureGroup')
const ref = require('./figureRef')
const shortcodeFactory = require('../../_plugins/components/addShortcode')
const title = require('./title')
const tombstone = require('./tombstone')
const warn = require('./warn')

module.exports = function(eleventyConfig, collections, options) {
  const addShortcode = shortcodeFactory(eleventyConfig, collections)

  addComponentTag(eleventyConfig, 'annoref', annoref)
  eleventyConfig.addPairedShortcode('backmatter', function(content, ...args) {
    return backmatter(eleventyConfig)(content, ...args)
  })
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('def', def)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('ref', ref)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
  eleventyConfig.addPairedShortcode('warn', function(content, ...args) {
   return warn(eleventyConfig)(content, ...args)
 })
}
