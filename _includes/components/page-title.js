//
// CUSTOMIZED FILE -- Bronze Guidelines
// wrap label, label divider, and title elements in their own spans
// for PDF footers, add blank <span> when there's no label otherwise
// don't include an empty .quire-page-seperator element to avoid EPUB validation error
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
    const subtitleDividerElement = title && !title.match(/\?|!/) ? '<span class="quire-page-seperator">: </span>' : ' '

    const pageLabel = label ? `<span class="quire-page-label">${label}</span><span class="quire-page-label-divider">${labelDivider}</span>` : ``

    const pageSubtitle = subtitle ? `${subtitleDividerElement}<span class="quire-page-subtitle">${subtitle}</span>` : ''

    const pageTitle = `${pageLabel}<span class="quire-page-title">${title}</span>${pageSubtitle}`

    return markdownify(pageTitle)
  }
}
