//
// CUSTOMIZED FILE -- Bronze Guidelines
// added def, objgroup, and open shortcodes
//
const accordion = require('./accordion.js')
const addComponentTag = require('../../_plugins/components/addComponentTag')
const backmatter = require('./backmatter')
const bibliography = require('./bibliography')
const cite = require('./cite')
const contributors = require('./contributors')
const def = require('./def')
const figure = require('./figure')
const figureGroup = require('./figureGroup')
const objectGroup = require('./objectGroup')
const objectLink = require('./objectLink')
const open = require('./open')
const ref = require('./ref')
const shortcodeFactory = require('../components/shortcodeFactory')
const title = require('./title')
const tombstone = require('./tombstone')

module.exports = function(eleventyConfig, collections, options) {
  const { addShortcode, addPairedShortcode } = shortcodeFactory(eleventyConfig, collections)

  addPairedShortcode('accordion', accordion)
  addComponentTag(eleventyConfig, 'ref', ref)
  addPairedShortcode('backmatter', backmatter)
  addShortcode('bibliography', bibliography)
  addShortcode('cite', cite)
  addComponentTag(eleventyConfig, 'contributors', contributors)
  addShortcode('def', def)
  addShortcode('figure', figure)
  addShortcode('figuregroup', figureGroup)
  addShortcode('objgroup', objectGroup)
  addShortcode('objlink', objectLink)
  addShortcode('open', open)
  addShortcode('title', title)
  addShortcode('tombstone', tombstone)
}
