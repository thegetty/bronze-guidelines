//
// CUSTOMIZED FILE
// Add apple icon and configure as mobile app
// Update and clean-up handling for social sharing
//
const path = require('path')
/**
 * Head Tag
 *
 * @param      {Object}  eleventyConfig
 */
module.exports = function(eleventyConfig) {
  const analytics = eleventyConfig.getFilter('analytics')
  const dublinCore = eleventyConfig.getFilter('dublinCore')
  const jsonld = eleventyConfig.getFilter('jsonld')
  const opengraph = eleventyConfig.getFilter('opengraph')
  const removeHTML = eleventyConfig.getFilter('removeHTML')
  const twitterCard = eleventyConfig.getFilter('twitterCard')
  const webComponents = eleventyConfig.getFilter('webComponents')

  const { application, figures, publication } = eleventyConfig.globalData

  /**
   * @param  {Object} params The Whole Dang Data Object, from base.11ty.js
   */
  return function (page) {
    const { abstract, canonicalURL, cover, layout, title } = page
    const pageTitle = removeHTML(
      title ? `${publication.title} | ${title}` : publication.title
    )

    const description = publication.description.full || publication.description.one_line

    const publisherLinks = publication.publisher
      .filter(({ url }) => url)
      .map(({ url }) => `<link rel="publisher" href="${ url }">`)
      .join('\n')

    const contributorLinks = publication.contributor
      .filter(({ url }) => url)
      .map(({ url }) => `<link rel="author" href="${ url }">`)
      .join('\n')

    const keywords = publication.subject
      .filter(({ type }) => type === 'keyword')
      .map(({ name }) => name)
      .join(', ')

    return `
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex, nofollow"/>

        <meta name="generator" content="${application.name} ${application.version}" />

        <title>${pageTitle}</title>

        <meta name="description" content="${description}">
        <meta name="keywords" content="${keywords}">

        <link rel="canonical" href="${canonicalURL}">
        <link rel="version-history" href="${publication.repositoryUrl}">

        <script src="/_assets/javascript/application/canvas-panel-web-components-1.0.68.js" type="module"></script>

        ${publisherLinks}

        ${contributorLinks}

        ${dublinCore()}

        ${opengraph({ page })}

        ${twitterCard({ page })}

        <script type="application/ld+json">${jsonld({ canonicalURL, page })}</script>

        <meta name="apple-mobile-web-app-title" content="${publication.title}">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="apple-touch-icon" sizes="180x180" href="/_assets/images/icons/apple-touch-icon-180x180.png">
        <link rel="icon" href="/_assets/images/icons/favicon.ico" />
        <!--
          styles are already imported in _assets/javascript/application/index.js
          and rendered as inline minified <style type="text/css">...</style> blocks,
          not using these file links
        -->
        <!-- <link rel="stylesheet" href="/_assets/styles/application.scss" /> -->
        <!-- <link rel="stylesheet" href="/_assets/styles/custom.css" /> -->

        <!-- {% render 'polyfills/template.html' %} -->

        ${analytics()}
      </head>
    `
  }
}
