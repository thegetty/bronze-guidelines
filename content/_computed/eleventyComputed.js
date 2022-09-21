//
// CUSTOMIZED FILE -- Bronze Guidelines
// added presentation and tags values as classes, lines 55, 64–66
//
const chalkFactory = require('~lib/chalk')
const path = require('path')

const { warn } = chalkFactory('eleventyComputed')

/**
 * Global computed data
 */
module.exports = {
  canonicalURL: ({ config, page }) => page.url && path.join(config.baseURL, page.url),
  eleventyNavigation: {
    /**
     * Explicitly define page data properties used in the TOC
     * since eleventyNavigation does not include the entire page object
     */
    data: (data) => {
      return {
        abstract: data.abstract,
        contributor: data.contributor,
        figure: data.figure,
        image: data.image,
        label: data.label,
        layout: data.layout,
        object: data.object,
        order: data.order,
        short_title: data.short_title,
        subtitle: data.subtitle,
        summary: data.summary,
        title: data.title
      }
    },
    key: (data) => data.key,
    order: (data) => data.order,
    parent: (data) => data.parent,
    title: (data) => data.title,
    url: (data) => data.page.url
  },
  /**
   * Current page key
   * @return {String}
   */
  key: (data) => {
    if (!data.page.url) return
    const segments = data.page.url.split('/')
    const key = segments.slice(1, segments.length - 1).join('/')
    return data.key || key
  },
  /**
   * Classes applied to <main> page element
   */
  pageClasses: ({ collections, class: classes, layout, page, presentation, tags }) => {
    const pageClasses = []
    // Add computed frontmatter and page-one classes
    const pageIndex = collections.allSorted.findIndex(({ outputPath }) => outputPath === page.outputPath)
    const pageOneIndex = collections.allSorted.findIndex(({ data }) => data.class && data.class.includes('page-one'))
    if (pageIndex < pageOneIndex) {
      pageClasses.push('frontmatter')
    }

    // add classes based on presentation and tags
    presentation ? pageClasses.push(presentation) : ''
    tags ? pageClasses.push(tags) : ''

    // add custom classes from page frontmatter
    return classes ? pageClasses.concat(classes) : pageClasses
  },
  pageContributors: ({ contributor, contributor_as_it_appears }) => {
    if (!contributor) return
    if (contributor_as_it_appears) return contributor_as_it_appears
    return (Array.isArray(contributor)) ? contributor : [contributor];
  },
  /**
   * Compute a 'pageData' property that includes the page and collection page data
   * @todo figure out how to have this override the page property
   */
  pageData: ({ collections, page }) => {
    if (!collections) return
    return collections.all.find(({ url }) => url === page.url)
  },
  /**
   * Figures data for figures referenced by id in page frontmatter
   */
  pageFigures: ({ figure, figures }) => {
    if (!figure || !figure.length) return
    return figure.map((figure) => figures.find((item) => item.id === figure.id))
  },
  /**
   * Objects data referenced by id in page frontmatter including figures data
   */
  pageObjects: function ({ figures, object, objects }) {
    if (!object || !object.length) return
    return object
      .reduce((validObjects, item) => {
        const objectData = objects.object_list.find(({ id }) => id === item.id)
        if (!objectData) {
          warn(`pageObjects: no object found with id ${item.id}`)
          return validObjects
        }

        if (!objectData.figure) {
          warn(`pageObjects: object id ${objectData.id} has no figure data`)
        } else {
          objectData.figures = objectData.figure.map((figure) => {
            if (figure.id) {
              return this.getFigure(figure.id)
            } else {
              return figure
            }
          })
          validObjects.push(objectData)
        }

        return validObjects
      }, [])
  },
  pagination: ({ collections, page }) => {
    if (!page || !collections.navigation.length) return {}
    const currentPageIndex = collections.navigation
      .findIndex(({ url }) => url === page.url)
    if (currentPageIndex === -1) return {}
    return {
      currentPage: collections.navigation[currentPageIndex],
      currentPageIndex,
      percentProgress: 100 * (currentPageIndex + 1) / collections.navigation.length,
      nextPage: collections.navigation[currentPageIndex + 1],
      previousPage: collections.navigation[currentPageIndex - 1]
    }
  },
  /**
   * Parent page key
   * @return {String}
   */
  parent: ({ page, parent }) => {
    if (!page.url) return
    const segments = page.url.split('/')
    const parentSegment = segments.slice(1, segments.length - 2).join('/')
    return parent || parentSegment
  },
  parentPage:({ collections, parent }) => {
    return collections.all.find((item) => parent && item.data.key === parent)
  },
  /**
   * Contributors with a `pages` property containing data about the pages they contributed to
   */
  publicationContributors: ({ collections, config, publication }) => {
    const { contributor } = publication
    if (!collections.all) return
    return contributor
      .map((item) => {
        const { pic } = item
        item.imagePath = pic
          ? path.join(config.params.imageDir, pic)
          : null
        item.pages = collections.all.filter(
          ({ data }) => {
            if (!data.contributor) return
            return Array.isArray(data.contributor)
              ? data.contributor.find(
                (pageContributor) => pageContributor.id === item.id
              )
              : data.contributor.id === item.id
          }
        )
        return item
      })
  }
}
