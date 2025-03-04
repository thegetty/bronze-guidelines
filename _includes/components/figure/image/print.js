//
// CUSTOMIZED FILE -- Bronze Guidelines
// add ALL image layers for annotation images, but static version for EPUB, lines 24–55
// css is used to stack or grid them
//
const { html } = require('~lib/common-tags')
const path = require('path')

/**
 * Renders an image with a caption in print output
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Object}  figure          Figure data
 *
 * @return     {String}  HTML containing an <img> element and a caption
 */
module.exports = function(eleventyConfig) {
  const figureCaption = eleventyConfig.getFilter('figureCaption')
  const figureLabel = eleventyConfig.getFilter('figureLabel')

  const { imageDir } = eleventyConfig.globalData.config.figures

  return function(figure) {
    const { alt, annotations=[], caption, credit, id, embed_link: embedLink, label, src, staticInlineFigureImage, thumb } = figure

    const labelElement = figureLabel({ caption, id, label })

    if (annotations.length > 0) { 

      const epubImageSrc = path.join(imageDir, thumb)
      const epubImageElement = html`<img alt="${alt}" class="q-figure__image" src="${epubImageSrc.replace('thumbs','epub')}" data-outputs-include="epub" />`

      for (const annotation of annotations) {

        let baseLayer = ''
        if (annotation.input == 'checkbox') {
          const baseSrc = path.join(imageDir, src)
          baseLayer = html`<img alt="${alt}" class="q-figure__image" src="${baseSrc}" data-outputs-include="html,pdf" />`
        }

        let layers = '';
        for (const item of annotation.items) {
          const layerSrc = path.join(imageDir, item.src)
          layers += html`<img alt="" class="q-figure__image" src="${layerSrc}" data-outputs-include="html,pdf" />`
        }

        return html`
          <div class="q-figure__layers-group q-figure__layers-group--${annotation.input}">
            ${baseLayer}
            ${layers}
            ${epubImageElement}
          </div>
          ${figureCaption({ caption, content: labelElement, credit })}
        `
      }
    }

    // this has to come after annotations, because radio-button
    // annotations don't have any src
    if (!src && !staticInlineFigureImage) return ''

    let imageSrc

    switch (true) {
      case figure.isSequence:
        imageSrc = figure.staticInlineFigureImage
        break
      case figure.isCanvas || figure.isImageService:
        imageSrc = figure.printImage
        break
      default:
        imageSrc = src.startsWith('http')
          ? src
          : path.join(imageDir, src)
        break
    }

    return html`
      <img alt="${alt}" class="q-figure__image" src="${imageSrc}"/>
      ${figureCaption({ caption, content: labelElement, credit, embedLink, id })}
    `
  }
}
