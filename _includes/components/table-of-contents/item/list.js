//
// CUSTOMIZED FILE -- Bronze Guidelines
// also added handling for contributor_as_it_appears, lines 38, 53–61, and 78
//
const path = require('path')
const { html, oneLine } = require('~lib/common-tags')

/**
 * Renders a TOC list item
 *
 * @param     {Object} context
 * @param     {String} params
 * @property  {Array} children - The TOC page item's child pages
 * @property  {String} page - The TOC item's page data
 * @property  {String} presentation How the TOC should display. Possible values: ['abstract', 'brief']
 *
 * @return {String} TOC list item markup
 */
module.exports = function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const icon = eleventyConfig.getFilter('icon')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const slugify = eleventyConfig.getFilter('slugify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const { contributorDivider } = eleventyConfig.globalData.config.tableOfContents

  return function (params) {
    const {
      children='',
      classes=[],
      page,
      presentation
    } = params

    const {
      abstract,
      contributor: pageContributors,
      contributor_as_it_appears: contributorAsItAppears,
      label,
      layout,
      short_title,
      subtitle,
      summary,
      title
    } = page.data

    /**
     * Check if item is a reference to a built page or just a heading
     * @type {Boolean}
     */
    const isPage = !!layout

    let contributorsText
    if (contributorAsItAppears) {
      contributorsText = markdownify(contributorAsItAppears)
    } else if (pageContributors) {
      contributorsText = contributors({ context: pageContributors, format: 'string' })
    }

    const pageContributorsElement = contributorAsItAppears || pageContributors
      ? `<span class="contributor-divider">${contributorDivider}</span><span class="contributor">${contributorsText}</span>`
      : ''

    let pageTitleElement
    if (presentation === 'brief') {
      pageTitleElement = short_title || title
    } else {
      pageTitleElement = oneLine`${pageTitle({ label, subtitle, title })}${pageContributorsElement}`
    }

    const arrowIcon = `<span class="arrow" data-outputs-exclude="epub,pdf">${icon({ type: 'arrow-forward', description: '' })}</span>`

    // Returns abstract with any links stripped out
    const abstractText =
      presentation === 'abstract' && (abstract || summary)
        ? `<div class="abstract-text">${removeHTML(markdownify(abstract))}</div>`
        : ''

    let mainElement = `${markdownify(pageTitleElement)}${isPage && !children ? arrowIcon : ''}`

    if (isPage) {
      mainElement = `<a href="${page.url}">${mainElement}</a>`
    } else {
      classes.push('no-landing')
    }

    return html`
      <li class="${classes.join(' ')}">
        ${mainElement}
        ${abstractText}
        ${children}
      </li>
    `
  }
}
