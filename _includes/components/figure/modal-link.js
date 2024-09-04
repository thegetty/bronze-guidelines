//
// CUSTOMIZED FILE
// Made link iframe viewer instead of modal
//
const { html } = require('~lib/common-tags')

module.exports = function (eleventyConfig) {
  const { enableModal } = eleventyConfig.globalData.config.figures

  // const atlasId = id.replace('fig-','')

  return ({ content, id }) => enableModal
    ? html`<a class="object-link" target="object-iframe" href="/visual-atlas/${id.replace('fig-','')}/">${content}</a>`
    : content
}
