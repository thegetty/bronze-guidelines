//
// CUSTOMIZED FILE -- Bronze Guidelines
// wrap label, label divider, and title elements in their own spans
//
const { oneLine } = require('~lib/common-tags')
/**
 * Concatenates the page title and subtitle, using a colon, or if the title ends with a ! or ?, no colon is included.
 * See also site-title.js
 *
 * @param {Object} eleventyConfig
 * @param {Object} params
 * @property {Object} label
 * @property {Object} subtitle
 * @property {Object} title
 *
 * @return {string} `page title: subtitle`
 */
module.exports = function(eleventyConfig) {
  const markdownify = eleventyConfig.getFilter('markdownify')

  const { pageLabelDivider } = eleventyConfig.globalData.config.params

  return function(params) {

    const { label, subtitle, title } = params
    const separator = title && !title.match(/\?|\!/) ? ': ' : ' '

    const pageTitle = subtitle ? [title, subtitle].join(separator) : title
    const pageTitleElement = `<span class="quire-page-title">${markdownify(pageTitle)}</span>`

    const divider = pageLabelDivider ? pageLabelDivider : '. '
    const labelElement = label
      ? `<span class="quire-page-label">${markdownify(label)}</span><span class="quire-page-label-divider">${divider}</span>` : ''

    // if (label) {
    //   const labelElement = `<span class="quire-page-label">${label}${pageLabelDivider}</span>`
    //   pageTitleElement = `${[labelElement, pageTitleElement].join(' ')}`
    // }

    return oneLine`${labelElement}${pageTitleElement}`
  }
}
