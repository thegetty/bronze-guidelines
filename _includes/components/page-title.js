//
// CUSTOMIZED FILE -- Bronze Guidelines
// wrap label, label divider, and title elements in their own spans
// for PDF footers, add blank <span> when there's no label otherwise
//
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

  const { labelDivider } = eleventyConfig.globalData.config.pageTitle

  return function(params) {

    const { label, subtitle, title } = params
    const subtitleDivider = title && !title.match(/\?|!/) ? ': ' : ' '

    const pageLabel = label ? `<span class="quire-page-label">${label}</span><span class="quire-page-label-divider">${labelDivider}</span>` : `<span class="quire-page-label"></span>`

    const pageSubtitle = subtitle ? `<span class="quire-page-seperator">${subtitleDivider}</span><span class="quire-page-subtitle">${subtitle}</span>` : ''

    const pageTitle = `${pageLabel}<span class="quire-page-title">${title}</span>${pageSubtitle}`

    return markdownify(pageTitle)
  }
}
