//
// CUSTOMIZED FILE -- Bronze Guidelines
//
const { html } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')
const figure = require('./figure')

const { warn } = chalkFactory('shortcodes:figureGroup')

/**
 * Render multiple <figure> elements in a group
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Array<id>}  ids          An array or list of figure identifiers
 * @return     {String}  An HTML string of the elements to render
 */
module.exports = function (eleventyConfig, { page }) {
  return async function (columns, ids=[]) {
    columns = parseInt(columns)

    /**
     * Parse the ids arg for figure identifiers
     * The ids arg can be either a string of comma separated figure ids,
     * @example 'fig-1, fig-2, fig-3'
     * or an array of identifier strings
     * @example ['fig-1', 'fig-2', 'fig-3']
     */
    ids = Array.isArray(ids) ? ids : ids.split(',').map((id) => id.trim())

    if (!ids.length) {
      warn(`NoId: the q-figures shortcode must include one or more 'id' values that correspond to an 'id' in the 'figures.yaml' file. @example {% qfiguregroup columns=2, ids='3.1, 3.2, 3.3' %}`)
    }

    // if (ErrorNoMediaType) {
    //   warn(`NoMediaType: One of the figures passed to the q-figures shortcode is missing the 'media_type' attribute. Figures in 'figures.yaml' must be have a 'media_type' attribute with a value of either  "vimeo" or "youtube"`)
    // }

    const gridClass = `quire-grid-${columns}`

    let figures = '';
    for (let i=0; i < ids.length; i++) {
      figures += await figure(eleventyConfig, { page })(ids[i]);
    }

    return html`
      <figure class="${['q-figure', 'q-figure--group', gridClass].join(' ')}">
        ${figures}
      </figure>
    `
}
}
