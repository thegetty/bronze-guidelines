//
// CUSTOMIZED FILE -- Bronze Guidelines
// based on page-header.js except adds editorsElement and
// additionalContributorsElement, lines 54–78
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
      byline_format: bylineFormat,
      image,
      label,
      pageContributors,
      subtitle,
      title,
      edited_by,
      additional_contributors
    } = params

    const classes = ['quire-page__header', 'hero']

    if (title == 'title page' || title == 'half title page') {
      classes.push('is-screen-only')
    }

    const pageLabel = label
      ? `<span class="label">${label}<span class="visually-hidden">${labelDivider}</span></span>`
      : ''

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
            ${contributors({ context: pageContributors, format: bylineFormat })}
            ${additionalContributorsElement}
          </div>
        `
      : ''

    return html`
      <section class="${classes}">
        <div class="hero-body">
          <h1 class="quire-page__header__title" id="${slugify(title)}">
            ${pageLabel}
            ${pageTitle({ title, subtitle })}
          </h1>
          ${contributorsElement}
        </div>
      </section>
      ${imageElement}
    `
  }
}
