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
    } else if (ids.includes("vid")) {
      label = idArray.length > 1 ? 'videos' : 'video'
      icon = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.958 13.562 13.562 10 7.958 6.438ZM10 18.167q-1.688 0-3.177-.636-1.49-.635-2.604-1.75-1.115-1.114-1.75-2.604-.636-1.489-.636-3.177 0-1.708.636-3.187.635-1.48 1.75-2.594 1.114-1.115 2.604-1.75Q8.312 1.833 10 1.833q1.708 0 3.188.636 1.479.635 2.593 1.75 1.115 1.114 1.75 2.604.636 1.489.636 3.177t-.636 3.177q-.635 1.49-1.75 2.604-1.114 1.115-2.604 1.75-1.489.636-3.177.636Zm0-1.729q2.688 0 4.562-1.876 1.876-1.874 1.876-4.562t-1.876-4.562Q12.688 3.562 10 3.562T5.438 5.438Q3.562 7.312 3.562 10t1.876 4.562Q7.312 16.438 10 16.438ZM10 10Z"/></svg>`
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
