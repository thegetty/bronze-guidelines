//
// CUSTOMIZED FILE -- Bronze Guidelines
// add hasShortcodes filter, lines 11 and 35
//
// Quire data filters
const fullname = require('./fullname')
const getAnnotation = require('./getAnnotation')
const getContributor = require('./getContributor')
const getFigure = require('./getFigure')
const getObject = require('./getObject')
const hasShortcodes = require('./hasShortcodes')
const initials = require('./initials')
const keywords = require('./keywords')
const sortContributors = require('./sortContributors')
const sortReferences = require('./sortReferences')

// string filters
const capitalize = require('./capitalize')
const json = require('./json')
const removeHTML = require('./removeHTML')
const slugifyIds = require('./slugifyIds')
const titleCase = require('./titleCase')

// Web component rendering
const renderWebcComponent = require('./renderWebcComponent')

/**
 * Add universal filters for use in templates
 * @see https://www.11ty.dev/docs/filters/#universal-filters
 */
module.exports = function(eleventyConfig, options) {
  /**
   * Quire data filters
   */
  eleventyConfig.addFilter('fullname', (person, options) => fullname(person, options))
  eleventyConfig.addFilter('getAnnotation', (...args) => getAnnotation(eleventyConfig, ...args))
  eleventyConfig.addFilter('getContributor', (id) => getContributor(eleventyConfig, id))
  eleventyConfig.addFilter('getFigure', (id) => getFigure(eleventyConfig, id))
  eleventyConfig.addFilter('getObject', (id) => getObject(eleventyConfig, id))
  eleventyConfig.addFilter('hasShortcodes', (text) => hasShortcodes(text))
  eleventyConfig.addFilter('initials', (person, options) => initials(person, options))
  eleventyConfig.addFilter('keywords', () => keywords(eleventyConfig))
  eleventyConfig.addFilter('sortContributors', (contributors) => sortContributors(eleventyConfig, contributors))
  eleventyConfig.addFilter('sortReferences', (items) => sortReferences(eleventyConfig, items))
  /**
   * String manipulation filters
   */
  eleventyConfig.addFilter('capitalize', (string) => capitalize(string))
  eleventyConfig.addFilter('json', (string) => json(string))
  eleventyConfig.addFilter('removeHTML', (string) => removeHTML(string))
  eleventyConfig.addFilter('slugifyIds', (string) => slugifyIds(string, eleventyConfig))
  eleventyConfig.addFilter('titleCase', (string) => titleCase(string))
  /**
   * Web component rendering
   */
  eleventyConfig.addFilter('renderWebcComponent', renderWebcComponent)
}
