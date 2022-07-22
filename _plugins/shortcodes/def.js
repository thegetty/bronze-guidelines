const chalkFactory = require('~lib/chalk')
const { renderOneLine } = require('~lib/common-tags')
const { warn } = chalkFactory('shortcodes:def')

/**
 * Shortcode to display pop-up vocab definitions with links to full vocab page
 *
 * @param      {String}   term      Matching a term in the vocabulary section
 * @param      {String}   display   An optional override for inline display
 * @return     {boolean}  An HTML <span> element copying the citation pop-up
 */
module.exports = function (eleventyConfig, { collections, page }) {
  const markdownify = eleventyConfig.getFilter('markdownify')

  return function (term, display) {
    let isTerm = false
    for ( const entry of collections.vocabulary ) {
      if (entry.data.title == term) {
        isTerm = true
        const displayText = display ? display : term

        // strip def and cite shortcodes and show display value only
        const regex = /\{% [a-z]+ (\"([^\"]*?)\" ){1,3}%\}/g
        const plainDefinition = entry.data.definition.replace(regex, '$2')

        // truncate definition but not mid-word
        const maxLength = 240
        let displayDefinition = ''
        if (plainDefinition.length < maxLength){
          displayDefinition = plainDefinition
        } else {
          displayDefinition = plainDefinition.substring(0, maxLength)
          displayDefinition = displayDefinition
            .substring(0, Math.min(
              displayDefinition.length,
              displayDefinition.lastIndexOf(' ')))
            .concat(' ...')
        }

        return renderOneLine`
          <span class="quire-citation quire-definition expandable">
            <span class="quire-citation__button quire-definition__button" role="button" tabindex="0" aria-expanded="false">
              ${displayText}
            </span>
            <span hidden class="quire-citation__content quire-definition__content">
              <span class="visually-hidden">Definition: </span>
              <strong>${entry.data.title}: </strong>${markdownify(displayDefinition)} <a href="${entry.url}" class="quire-definition__content__more-link">More</a>
            </span>
          </span>`
      }
    }
    if ( isTerm == false ) {
      warn(`Vocabulary page not found for '${term}' on ${page.inputPath}`)

      return renderOneLine`<span style="color: tomato;">${term}</span>`
    }
  }
}