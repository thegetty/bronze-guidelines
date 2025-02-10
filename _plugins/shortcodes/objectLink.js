//
// CUSTOMIZED FILE -- Bronze Guidelines
// Based on `open` and previously `ref`, creates figure links that open in iframe viewer
//
const { oneLine } = require('~lib/common-tags')
const { oneLineCommaLists } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')

const { warn } = chalkFactory('shortcodes:figureRef')

/**
 * Generate markdown for an inline list of links to figures on the page.
 *
 * @example reference a single figure
 *   {% ref 'fig-4' %}
 *  renders the following markdown string
 *   [fig. 4](#fig-4)
 *
 * @example reference two figures
 *   {% ref 'fig-4, fig-5' %}
 *  renders the following markdown string
 *   [figs. 4](#fig-4) and [5](#fig-5)
 *
 * @example reference three or more figures
 *   {% ref 'fig-4, fig-5, fig-6, fig-7' %}
 *  renders the following markdown string
 *   [figs. 4](#fig-4), [5](#fig-5), [6](#fig-6), and [7](#fig-7)
 */
module.exports = function(eleventyConfig) {
  const icon = eleventyConfig.getFilter('icon')
  return function (ids) {
    const idArray = ids.replace(/\s/g,'').split(',')
    if (!idArray.length) {
      warn(`NoId: Figure 'ref' shortcode must include one or more values corresponding to the 'id' of a figure on the page. @example {% ref 'fig-1', 'fig-7', 'fig-11' %}`)
    }

    let label = ""
    let linkIcon = ""
    let customClass = ""
    let linkPrefix = ""
    if (ids.includes("fig")) {
      label = idArray.length > 1 ? 'figs.' : 'fig.'
      linkPrefix = `/visual-atlas/`
    } else if (ids.includes("table")) {
      label = idArray.length > 1 ? 'tables' : 'table'
      linkIcon = oneLine`${icon({ type: 'table', description: 'Open viewer' })}`
      customClass = `object-link`
      linkPrefix = `/tables/`
    } else if (ids.includes("vid")) {
      label = idArray.length > 1 ? 'videos' : 'video'
      linkIcon = oneLine`${icon({ type: 'video', description: 'Open viewer' })}`
      linkPrefix = `/visual-atlas/v`
    }

    // transform the array of figure ids into and array of markdown links
    const links = idArray.map((id, index) => {
      linkId = id.trim().replace(/[a-z|-]/g, '')
      let text = id.replace(/^[a-z]+-[0]{0,2}/i, '')
      if (index === 0) text = `${label} ${text}`
      // return `[${text}](${linkPrefix}${linkId}/){target=object-iframe}${customClass}`
      return oneLine`<a href="${linkPrefix}${linkId}/" target="object-iframe" class="${customClass}">${text}</a>`
    })

    const allLinks = oneLineCommaLists`${links}`

    return oneLine`<span class="object-link-group">${allLinks}${linkIcon}</span>`
  }
}
