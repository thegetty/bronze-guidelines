/**
 * Temporary shortcode to replace q-def
 *
 * @param      {String}  term  Matching a term in the vocabulary section
 *
 * @return     {boolean}  A styled HTML <span> element with the term
 */
module.exports = function (eleventyConfig) {
  return (term) => `<span style="color: tomato;">${term}</span>`
}