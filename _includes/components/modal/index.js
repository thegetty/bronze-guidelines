//
// CUSTOMIZED FILE -- Bronze Guidelines
// added .q-lightbox--modal class in order to style the modal lightbox
// differently than the non-modal lightbox, line 23
//
const { html } = require('~lib/common-tags')

/**
 * Modal Tag
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  globalData
 */
module.exports = function (eleventyConfig) {
  const lightboxStyles = eleventyConfig.getFilter('lightboxStyles')
  const lightboxUI = eleventyConfig.getFilter('lightboxUI')
  const lightboxData = eleventyConfig.getFilter('lightboxData')

  return async function (figures) {
    if (!figures) return

    return html`
      <q-modal>
        <q-lightbox class="q-lightbox--modal">
          ${lightboxStyles()}
          ${await lightboxData(figures)}        
          ${lightboxUI(figures)}
        </q-lightbox>
        <button
          data-modal-close
          class="q-modal__close-button"
          id="close-modal"
        ></button>
      </q-modal>
    `
  }
}
