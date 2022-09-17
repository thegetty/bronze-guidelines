//
// CUSTOMIZED FILE -- Bronze Guidelines
// added .q-lightbox--modal class in order to style the modal lightbox
// differently than the non-modal lightbox, line 27
//
const { html } = require('~lib/common-tags')

/**
 * Modal Tag
 *
 * @param      {Object}  eleventyConfig
 * @param      {Object}  globalData
 */
module.exports = function (eleventyConfig, { page }) {
  const lightboxSlides = eleventyConfig.getFilter('lightboxSlides')
  const lightboxUI = eleventyConfig.getFilter('lightboxUI')

  return async function (figures=page.figures) {
    if (!figures) return;
    figures = figures.map((figure) => ({
      preset: 'zoom',
      ...figure
    }))

    return html`
      <q-modal>
        <q-lightbox class="q-lightbox--modal">
          ${await lightboxSlides(figures)}
          ${lightboxUI(figures)}
        </q-lightbox>
        <button
          data-modal-close
          class="q-modal__close-button"
          id="close-modal"
        ></button>
      </q-modal>
    `;
  }
}
