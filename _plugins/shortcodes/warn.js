//
// CUSTOMIZED FILE -- Bronze Guidelines
//
/**
 * Style wrapped `content` as "warn"
 *
 * @param      {String}  content  content between shortcode tags
 *
 * @return     {boolean}  A styled HTML <div> element with the content
 */
module.exports = function (eleventyConfig) {
  return (content) => `<div class="warn">${content}</div>`
}
