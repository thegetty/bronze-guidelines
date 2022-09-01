//
// CUSTOMIZED FILE -- Bronze Guidelines
// render 'fig-4, fig-5', instead of 'fig-4', 'fig-5', line 31
// remove leading zeroes, line 42
// add .q-figure__modal-link class, line 44
//
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
  return function (ids) {
    const idArray = ids.replace(/\s/g,'').split(',')
    if (!idArray.length) {
      warn(`NoId: Figure 'ref' shortcode must include one or more values corresponding to the 'id' of a figure on the page. @example {% ref 'fig-1', 'fig-7', 'fig-11' %}`)
    }

    let label = ""
    let icon = ""
    if (ids.includes("fig")) {
      label = idArray.length > 1 ? 'figs.' : 'fig.'
    } else if (ids.includes("table")) {
      label = idArray.length > 1 ? 'tables' : 'table'
      icon = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3 17V3h14v14Zm1.5-9.562h11V4.5h-11Zm4.167 4.041h2.666V8.938H8.667Zm0 4.021h2.666v-2.521H8.667ZM4.5 11.479h2.667V8.938H4.5Zm8.333 0H15.5V8.938h-2.667ZM4.5 15.5h2.667v-2.521H4.5Zm8.333 0H15.5v-2.521h-2.667Z"/></svg>`
    } else if (ids.includes("video")) {
      label = idArray.length > 1 ? 'videos' : 'video'
      icon = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8 13.5 5.5-3.5L8 6.5ZM3.5 16q-.625 0-1.062-.438Q2 15.125 2 14.5v-9q0-.625.438-1.062Q2.875 4 3.5 4h13q.625 0 1.062.438Q18 4.875 18 5.5v9q0 .625-.438 1.062Q17.125 16 16.5 16Zm0-1.5h13v-9h-13v9Zm0 0v-9 9Z"/></svg>`
    }

    // transform the array of figure ids into and array of markdown links
    const links = idArray.map((id, index) => {
      id = id.trim()
      let text = id.replace(/^[a-z]+-[0]{0,2}/i, '')
      if (index === 0) text = `${label} ${text}`
      return `[${text}](#${id}){.q-figure__modal-link}`
    })

    const allLinks = oneLineCommaLists`${links}`

    return `${allLinks}${icon}`
  }
}
