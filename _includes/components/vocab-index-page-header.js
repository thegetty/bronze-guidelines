//
// CUSTOMIZED FILE -- Bronze Guidelines
// based on page-header.js except adds editorsElement and
// additionalContributorsElement, lines 55–79
// also called label through pageTitle()
//
const { html } = require('~lib/common-tags')
const path = require('path')

/**
 * Publication page header
 *
 * @param      {Object}  eleventyConfig
 */
module.exports = function(eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const slugify = eleventyConfig.getFilter('slugify')

  const { labelDivider } = eleventyConfig.globalData.config.pageTitle
  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (params) {
    const {
      image,
      label,
      pageContributors,
      subtitle,
      title,
      edited_by,
      additional_contributors,
      short_title: shortTitle
    } = params

    const classes = ['quire-page__header', 'hero']

    if (title == 'title page' || title == 'half title page') {
      classes.push('is-screen-only')
    }

    const imageElement = image
      ? html`
          <section
            class="${classes} hero__image"
           style="background-image: url('${path.join(imageDir, image)}');"
          >
          </section>
        `
      : ''

    const editorsElement = edited_by
      ? html`
          <p class="edited-by">
            Edited by ${edited_by}
          </p>
        `
      : ''

    const additionalContributorsElement = additional_contributors
      ? html`
          <p class="backmatter additional-contributors">
            Additional Contributors ${additional_contributors}
          </p>
        `
      : ''

    const contributorsElement = pageContributors
      ? html`
          <div class="quire-page__header__contributor">
            ${editorsElement}
            ${contributors({ context: pageContributors, format: 'string' })}
            ${additionalContributorsElement}
          </div>
        `
      : ''

    const runningFeetTitle = shortTitle ? shortTitle : title

    return html`
      <section class="${classes}">
        <div class="hero-body">
          <h1 class="quire-page__header__title" id="${slugify(title)}">
            ${pageTitle({ label, title, subtitle })}
          </h1>
          <div class="pdf-footers">
            <span class="pdf-footers__label">${markdownify(label)}</span>
            <span class="pdf-footers__title">${markdownify(runningFeetTitle)}</span>
          </div>
          ${contributorsElement}
        </div>
      </section>
      ${imageElement}
    `
  }
}
