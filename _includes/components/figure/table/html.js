//
// CUSTOMIZED FILE
// Updated link to open iframe viewer instead of modal
//
const { html } = require('~lib/common-tags')

/**
 * Renders a table into the document with a captionn
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Object}  figure          The figure object
 *
 * @return     {String}  Content of referenced table file and a caption
 */
module.exports = function(eleventyConfig) {
  const figureCaption = eleventyConfig.getFilter('figureCaption')
  const figureLabel = eleventyConfig.getFilter('figureLabel')
  const tableElement = eleventyConfig.getFilter('figureTableElement')
  const markdownify = eleventyConfig.getFilter('markdownify')

  return async function({ caption, credit, id, label, src }) {
    const table = await tableElement({ src })

    const labelElement = figureLabel({ caption, id, label })
    const captionElement = figureCaption({ caption, content: labelElement, credit })

    return html`
      <a 
        class="object-link" 
        target="object-iframe" 
        href="/visual-atlas/${id.replace('fig-','')}/"
      >
        ${table}
      </a>
      ${captionElement}
    `
  }
}
