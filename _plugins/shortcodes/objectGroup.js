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

    // Remove any duplicates
    const uniqIds = [...new Set(ids)];

    if (!uniqIds.length) {
      logger.warn(`NoId: the q-figures shortcode must include one or more 'id' values that correspond to an 'id' in the 'figures.yaml' file. @example {% qfiguregroup columns=2, ids='3.1, 3.2, 3.3' %}`)
    }

    let objectTags = []
    for (let id of uniqIds) {
      const objNumber = id.replace('fig-', '').replace('vid-', 'v')
      let objIcon = ''
      let objImagePath = ''
      let objLabel = ''
      for ( let fig of figureList ) {
        if (fig.id == id) {
          // objIcon
          if (fig.media_type == 'vimeo' ) {
            objIcon = `${icon({ type: 'video', description: 'Open viewer' })}`
          } else if (fig.media_type == 'table' ) {
            objIcon = `${icon({ type: 'table', description: 'Open viewer' })}`
          } else if (fig.sequences || fig.media_type == '3D' ) {
            objIcon = `${icon({ type: 'rotation', description: 'Open viewer' })}`
          } else if (fig.annotations ) {
            objIcon = `${icon({ type: 'layers', description: 'Open viewer' })}`
          } else {
            objIcon = `${icon({ type: 'fullscreen', description: 'Open viewer' })}`
          }
          // objImagePath
          if (fig.thumb) {
            objImagePath = `/_assets/images/${fig.thumb}`
          } else if (fig.annotations) {
            objImagePath = `/iiif/${id}/base/thumbnail.jpg`
          } else if (fig.zoom) {
            objImagePath = `/iiif/${id}/${objNumber}/thumbnail.jpg`
          } else if (fig.media_type == 'vimeo' || 'youtube') {
            objImagePath = `/_assets/images/${fig.poster}`
          } 
          // objLabel
          objLabel = fig.label ? fig.label : ''
        }
      }     
      const objElement = html`<figure class="page-object" data-outputs-exclude="pdf,epub">
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
