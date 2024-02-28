//
// CUSTOMIZED FILE -- Bronze Guidelines
// based on page-header.js except adds editorsElement and
// additionalContributorsElement, lines 55–79
// also called label through pageTitle()
// also added handling for contributor_as_it_appears
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
      contributor_as_it_appears,
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

    const editorsElement = contributor_as_it_appears
      ? html`
          <p class="edited-by">
            ${contributor_as_it_appears}
          </p>
        `
      : ''

    const additionalContributorsElement = additional_contributors
      ? html`
          <div class="backmatter additional-contributors">
            ${markdownify(additional_contributors)}
          </div>
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
