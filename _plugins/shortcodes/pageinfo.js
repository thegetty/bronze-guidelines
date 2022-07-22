//
// CUSTOMIZED FILE -- Bronze Guidelines
//
/**
 * A shortcode to display page info
 *
 * @param      {String}   info Data from the YAML frontmatter
 *
 * @return     {boolean}  An HTML <p> element with the data processed
 */
module.exports = function (eleventyConfig) {
  return (info) => `<p>${info}</p>`
}