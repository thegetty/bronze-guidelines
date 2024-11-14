//
// CUSTOMIZED FILE -- Bronze Guidelines
// removed hard-coded <em> tags in embed url, line 22
// add embed link to select images with embed_true
//
const { oneLine } = require('~lib/common-tags')

/**
 * Figure caption and credit
 * @param      {Object} eleventyConfig  eleventy configuration
 *
 * @param      {Object} params
 * @property   {String} figure
 * @property   {String} content
 * @return     {String}  An HTML <figcaption> element
 */
module.exports = function(eleventyConfig) {
  const markdownify = eleventyConfig.getFilter('markdownify')
  const figureMediaEmbedUrl = eleventyConfig.getFilter('figureMediaEmbedUrl')
  return function({ caption, credit, content='', embedLink, id, mediaId, mediaType}) {
    let mediaSourceLink = ''
    if (embedLink) {
      const sourceUrl = `https://www.getty.edu/publications/bronze-guidelines/visual-atlas/${id.replace('fig-', '')}/` 
      mediaSourceLink = sourceUrl
      ? `<span class="q-figure__caption-embed-link"><a href="${sourceUrl}">${sourceUrl}</a></span>`
      : ''
    } else {
      const { sourceUrl } = figureMediaEmbedUrl({ mediaId, mediaType })
      mediaSourceLink = sourceUrl
      ? `<span class="q-figure__caption-embed-link"><a href="${sourceUrl}">${sourceUrl}</a></span>`
      : ''
    }
    console.log("mediaSourceLink :: " + mediaSourceLink)

    return oneLine`
      <figcaption class="q-figure__caption">
        ${mediaSourceLink}
        ${markdownify(content)}
        <span class="q-figure__caption-content">${markdownify(caption || '')}</span>
        <span class="q-figure__credit">${markdownify(credit || '')}</span>
      </figcaption>
    `
  }
}
