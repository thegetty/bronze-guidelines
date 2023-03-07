//
// CUSTOMIZED FILE -- Bronze Guidelines
// called label through pageTitle() rather than constucting it separately
// also added handling for contributor_as_it_appears, lines 26 and 51–61
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
      contributor_as_it_appears: contributorAsItAppears,
      image,
      label,
      pageContributors,
      subtitle,
      title,
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

    let contributorsText
    if (contributorAsItAppears) {
      contributorsText = markdownify(contributorAsItAppears)
    } else if (pageContributors) {
      contributorsText = contributors({ context: pageContributors, format: bylineFormat })
    }

    const contributorsElement = contributorAsItAppears || pageContributors
      ? html`
          <div class="quire-page__header__contributor">
            ${contributorsText}
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
