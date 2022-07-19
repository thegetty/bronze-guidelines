const { html } = require('~lib/common-tags')
/**
 * A shortcode to display page info
 * @param      {String}   text    Text to process
 * @param      {String}   element The element to wrap it in
 * @return     {boolean}  An HTML <p> element with the data processed
 */
module.exports = function(text, element) {

  // return `<p>${text}</p>`
  if (element == 'figcaption' ) {
    return `<figcaption>${text}</figcaption>`
  } else if (element == 'div' ) {
    return `<div>${text}</div>`
  } else {
    return `<p>${text}</p>`
  }

  // const openingTag = '<' + element + '>'
  // const closingTag = '</' + element + '>'
  // return `<p>ELEMENT: ${openingTag} and ${closingTag}</p>`
  // return `${openingTag}${text}${closingTag}`

  // const node = ''
  // return node.createElement(element).innerHTML(text)

  // return `<p>ELEMENT: ${element}</p>`
  // return `<${element}>${text}</${element}>`

  // return `<span>${text}</span>`
  // return html`${text}`
  // return text

}