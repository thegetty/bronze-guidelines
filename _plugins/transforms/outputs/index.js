const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const html = require('./html/transform.js')
const pdf = require('./pdf/transform.js')
/**
 * Eleventy plugin to transform content for output as epub, html, pdf
 *
 * @param      {Object}  eleventyConfig  Eleventy configuration
 * @param      {Object}  collections  Eleventy collections
 */
module.exports = function(eleventyConfig, { collections }) {
  /**
   * Nota bene:
   * - Call transform with `this` context to ensure we have `this.outputPath`
   * - Order is important. The `html` transform must run last.
   */
  eleventyConfig.addTransform('pdf', function (content) {
    return pdf.call(this, eleventyConfig, collections, content)
  })
  eleventyConfig.addTransform('html', function (content) {
    return html.call(this, eleventyConfig, collections, content)
  })
}
