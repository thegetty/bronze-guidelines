//
// CUSTOMIZED FILE -- Bronze Guidelines
// added def and warn shortcodes
//
const addComponentTag = require('../../_plugins/components/addComponentTag')
const annoref = require('./annoref')
const backmatter = require('./backmatter.js')
const bibliography = require('./bibliography.js')
const cite = require('./cite.js')
const contributors = require('./contributors')
const figure = require('./figure.js')
const figureGroup = require('./figureGroup.js')
const ref = require('./figureRef.js')
const shortcodeFactory = require('../../_plugins/components/addShortcode')
const title = require('./title.js')
const tombstone = require('./tombstone.js')
const def = require('./def.js')
const warn = require('./warn.js')

module.exports = function(eleventyConfig, collections, options) {
  const addShortcode = shortcodeFactory(eleventyConfig, collections)

  addComponentTag(eleventyConfig, 'annoref', annoref)
  eleventyConfig.addPairedShortcode('backmatter', function(content, ...args) {
    return backmatter(eleventyConfig)(content, ...args)
  })
  eleventyConfig.addPairedShortcode('warn', function(content, ...args) {
    return warn(eleventyConfig)(content, ...args)
  })
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('ref', ref)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
  addShortcode('def', def)
}
