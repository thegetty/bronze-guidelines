//
// CUSTOMIZED FILE -- Bronze Guidelines
//
/**
 * A shortcode to display page info
 * @param      {String}   text    Text to process
 * @return     {boolean}  An HTML <p> element with the shortcodes processed
 */
module.exports = function(text) {
  return `<p>${text}</p>`
}