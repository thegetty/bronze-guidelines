//
// CUSTOMIZED FILE -- Bronze Guidelines
// Variant on figureGroup
//
const { html } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')

const logger = chalkFactory('shortcodes:figureGroup')

/**
 * Render multiple <figure> elements in a group
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Array<id>}  ids          An array or list of figure identifiers
 * @return     {String}  An HTML string of the elements to render
 */
module.exports = function (eleventyConfig, { page }) {
  const icon = eleventyConfig.getFilter('icon')
  const { figure_list: figureList } = eleventyConfig.globalData.figures

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
      logger.warn(`NoId: the q-figures shortcode must include one or more 'id' values that correspond to an 'id' in the 'figures.yaml' file. @example {% qfiguregroup columns=2, ids='3.1, 3.2, 3.3' %}`)
    }

    // if (ErrorNoMediaType) {
    //   logger.warn(`NoMediaType: One of the figures passed to the q-figures shortcode is missing the 'media_type' attribute. Figures in 'figures.yaml' must be have a 'media_type' attribute with a value of either  "vimeo" or "youtube"`)
    // }

    const gridClass = `quire-grid-${columns}`

    // const rows = 1
    // let figureTags = []
    // for (let i=0; i < rows; ++i) {
    //   const startIndex = i * columns
    //   let row = ''
    //   for (let id of ids) {
    //     row += await figure(eleventyConfig, { page }).bind(this)(id)
    //   }
    //   figureTags.push(`${row}`)
    // }

    let objectTags = []
    for (let id of ids) {
      const objIcon = `${icon({ type: 'fullscreen', description: 'Expand' })}`

      const objNumber = id.replace(/[a-z|-]/g, '')
      let objImagePath = ''
      let objLabel = ''
      for ( let fig of figureList ) {
        if (fig.id == id) {
          if (fig.annotations) {
            objImagePath = `/_assets/images/${fig.thumb}`
          } else if (fig.zoom) {
            objImagePath = `/iiif/${id}/${objNumber}/thumbnail.jpg`
          } else if (fig.thumb) {
            objImagePath = `/_assets/images/${fig.thumb}`
          } 
        objLabel = fig.label ? fig.label : ''
        }
      }     
      const objElement = html`<figure class="page-object">
      <img src="${objImagePath}" alt="" />
      <a href="/visual-atlas/${objNumber}/" target="object-iframe" class="object-link">${objIcon} <span class="object-label">${objLabel}</span></a>
      </figure>`

      objectTags.push(`${objElement}`)
    }


    return html`
      <div class="object-group group-grid-${columns}">
        ${objectTags.join('\n')}
      </div>
    `
}
}
