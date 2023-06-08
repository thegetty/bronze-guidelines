//
// CUSTOMIZED FILE -- Bronze Guidelines
// added def shortcode
//
const accordion = require('./accordion.js')
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
const shortcodeFactory = require('../components/shortcodeFactory')
const title = require('./title')
const tombstone = require('./tombstone')

module.exports = function(eleventyConfig, collections, options) {
  const { addShortcode, addPairedShortcode } = shortcodeFactory(eleventyConfig, collections)

  addPairedShortcode('accordion', accordion)
  addComponentTag(eleventyConfig, 'annoref', annoref)
  addPairedShortcode('backmatter', backmatter)
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('def', def)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('ref', ref)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
}
