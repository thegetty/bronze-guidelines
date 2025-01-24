//@ts-check
// CUSTOMIZED FILE -- Bronze Guidelines
// Adds script for iframe-based image viewer
// Allow only one pop-up to be open at a time
// Fix max-width of pop-ups, especially for narrower Visual Atlas text areas
// Added copyURL() function to strip zero-width spaces from URLs on copy
// Manage loading indicator for case study pages
//
/**
 * @fileOverview
 * @name application.js
 * @description This file serves as the entry point for Webpack, the JS library
 * responsible for building all CSS and JS assets for the theme.
 */

// Stylesheets
import '../../fonts/index.scss';
import '../../styles/application.scss'
import '../../styles/screen.scss'
import '../../styles/custom.css'

// Modules (feel free to define your own and import here)
import './canvas-panel'
import './soundcloud-api.min.js'
import { goToFigureState, setUpUIEventHandlers } from './canvas-panel'
import Accordion from './accordion'
import Search from '../../../../_plugins/search/search.js'
import scrollToHash from './scroll-to-hash'
import './iframe-viewer'
import '@google/model-viewer'

// array of leaflet instances
const mapArr = []

/**
 * toggleMenu
 * @description Show/hide the menu UI by changing CSS classes and Aria status.
 * This function is bound to the global window object so it can be called from
 * templates without additional binding.
 */
window['toggleMenu'] = () => {
  const menu = document.getElementById('site-menu')
  const catalogEntryImage = document.querySelector(
    '.side-by-side > .quire-entry__image-wrap > .quire-entry__image'
  )
  const menuAriaStatus = menu.getAttribute('aria-expanded')
  menu.classList.toggle('is-expanded', !menu.classList.contains('is-expanded'))
  if (menuAriaStatus === 'true') {
    catalogEntryImage && catalogEntryImage.classList.remove('menu_open')
    menu.setAttribute('aria-expanded', 'false')
  } else {
    catalogEntryImage && catalogEntryImage.classList.add('menu_open')
    menu.setAttribute('aria-expanded', 'true')
  }
}

/**
 * toggleSearch
 * @description Show/hide the search UI by changing CSS classes and Aria status.
 * This function is bound to the global window object so it can be called from
 * templates without additinoal binding.
 */
window['toggleSearch'] = () => {
  let searchControls = document.getElementById('js-search')
  let searchInput = document.getElementById('js-search-input')
  let searchAriaStatus = searchControls.getAttribute('aria-expanded')
  searchControls.classList.toggle(
    'is-active',
    !searchControls.classList.contains('is-active')
  )
  if (searchAriaStatus === 'true') {
    searchControls.setAttribute('aria-expanded', 'false')
  } else {
    searchInput.focus()
    searchControls.setAttribute('aria-expanded', 'true')
  }
}

/**
 * Paul Frazee's easy templating function
 * https://twitter.com/pfrazee/status/1223249561063477250?s=20
 */
function createHtml(tag, attributes, ...children) {
  const element = document.createElement(tag)
  for (let attribute in attributes) {
    if (attribute === 'className') element.className = attributes[attribute]
    else element.setAttribute(attribute, attributes[attribute])
  }
  for (let child of children) element.append(child)
  return element
}

/**
 * search
 * @description makes a search query using Lunr
 */
window['search'] = () => {
  let searchInput = document.getElementById('js-search-input')
  let searchQuery = searchInput['value']
  let searchInstance = window['QUIRE_SEARCH']
  let resultsContainer = document.getElementById('js-search-results-list')
  let resultsTemplate = document.getElementById('js-search-results-template')
  if (searchQuery.length >= 3) {
    let searchResults = searchInstance.search(searchQuery)
    displayResults(searchResults)
  }

  function clearResults() {
    resultsContainer.innerText = ''
  }

  function displayResults(results) {
    clearResults()
    results.forEach(result => {
      let clone = document.importNode(resultsTemplate.content, true)
      let item = clone.querySelector('.js-search-results-item')
      let title = clone.querySelector('.js-search-results-item-title')
      let type = clone.querySelector('.js-search-results-item-type')
      let length = clone.querySelector('.js-search-results-item-length')
      item.href = result.url
      title.textContent = result.title
      type.textContent = result.type
      length.textContent = result.length
      resultsContainer.appendChild(clone)
    })
  }
}

function onHashLinkClick(event) {
  // only override default link behavior if it points to the same page
  const anchor = event.target.closest('a')
  const hash = anchor.hash
  if (anchor.pathname.includes(window.location.pathname)) {
    // prevent default scrolling behavior
    event.preventDefault()
    // ensure the hash is manually set after preventing default
    window.location.hash = hash

  }
  scrollToHash(hash)
}

function setupCustomScrollToHash() {
  const invalidHashLinkSelectors = [
    '[href="#"]',
    '[href="#0"]',
    '.accordion-section__heading-link',
    '.q-figure__modal-link'
  ]
  const validHashLinkSelector =
    'a[href*="#"]' +
    invalidHashLinkSelectors
      .map((selector) => `:not(${selector})`)
      .join('')
  // Select all links with hashes, ignoring links that don't point anywhere
  const validHashLinks = document.querySelectorAll(validHashLinkSelector)
  validHashLinks.forEach((link) => {
    link.addEventListener('click', onHashLinkClick)
  })
}

/**
 * globalSetup
 * @description Initial setup on first page load.
 */
function globalSetup() {
  let container = document.getElementById('container')
  container.classList.remove('no-js')
  var classNames = []
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    classNames.push('device-ios')

  if (navigator.userAgent.match(/android/i)) classNames.push('device-android')

  if (classNames.length) classNames.push('on-device')

  loadSearchData()
  setupCustomScrollToHash()
}

/**
 * loadSearchData
 * @description Load full-text index data from the specified URL
 * and pass it to the search module.
 */
function loadSearchData() {
  // Grab search data
  const dataURL = document.getElementById('js-search').dataset.searchIndex
  if (!dataURL) {
    console.warn('Search data url is undefined')
    return
  }
  fetch(dataURL).then(async (response) => {
    const { ok, statusText, url } = response
    if (!ok) {
      console.warn(`Search data ${statusText.toLowerCase()} at ${url}`)
      return
    }
    const data = await response.json()
    window['QUIRE_SEARCH'] = new Search(data)
  })
}

/**
 * Applies MLA format to date
 *
 * @param  {Date}   date   javascript date object
 * @return {String}        MLA formatted date
 */
function mlaDate(date) {
  const options = {
    month: 'long'
  }
  const monthNum = date.getMonth()
  let month
  if ([4, 5, 6].includes(monthNum)) {
    let dateString = date.toLocaleDateString('en-US', options)
    month = dateString.replace(/[^A-Za-z]+/, '')
  } else {
    month = (month === 8) ? 'Sept' : date.toLocaleDateString('en-US', options).slice(0, 3)
    month += '.'
  }
  const day = date.getDate()
  const year = date.getFullYear()
  return [day, month, year].join(' ')
}

/**
 * @description
 * Set the date for the cite this partial
 * https://github.com/gettypubs/quire/issues/153
 * Quire books include a "Cite this Page" feature with page-level citations formatted in both Chicago and MLA style.
 * For MLA, the citations need to include a date the page was accessed by the reader.
 *
 */
function setDate() {
  const dateSpans = document.querySelectorAll('.cite-current-date')
  const formattedDate = mlaDate(new Date())
  dateSpans.forEach(((dateSpan) => {
    dateSpan.innerHTML = formattedDate
  }))
}

/**
* Translates the X-position of an element inside a container so that its contents
* are contained
* Expects the contained element to already be translated so that it's centered above
* another element
*
* @param {object} element to position
* @param {object} container element
* @param {number} container margin
*/
function setPositionInContainer(el, container) {
  const containerRect = container.getBoundingClientRect()
  // Computer width of content w/0 padding
  const computedStyle = getComputedStyle(container)
  const offsetLeft = parseFloat(computedStyle.paddingLeft)
  const offsetRight = parseFloat(computedStyle.paddingRight)
  const maxWidth = containerRect.width - offsetLeft - offsetRight
  // Set max size of pop-up box
  const setWidth = maxWidth > 400 ? 400 : maxWidth
  // Size and position pop-up box
  el.style.width = `${setWidth}px`
  el.style.left = `50%`
  el.style.transform = `translateX(-${setWidth/2}px)`

  const elRect = el.getBoundingClientRect()

  const leftDiff = containerRect.left - elRect.left
  const rightDiff = elRect.right - containerRect.right
  const halfElWidth = elRect.width/2

  // Shift position if pop-up box is outside container
  let offset = 0
  if (rightDiff > 0) {
    offset = offsetRight * .5
    el.style.transform = `translateX(-${halfElWidth+rightDiff+offset}px)`
  } else if (leftDiff > 0) {
    offset = offsetLeft * 1.5
    el.style.transform = `translateX(-${halfElWidth-leftDiff-offset}px)`
  }
  // @todo y
}

/**
 * @description
 * find expandable class and look for aria-expanded
 * https://github.com/gettypubs/quire/issues/152
 * Cite button where users can select, tied to two config settings:
 * citationPopupStyle - text for text only | icon for text and icon
 * citationPopupLinkText which is whatever text you it to say
 */
function toggleCite() {
  let expandables = document.querySelectorAll('.expandable [aria-expanded]')
  for (let i = 0; i < expandables.length; i++) {
    expandables[i].addEventListener('click', event => {
      // Allow these links to bubble up
      event.stopPropagation()
      // Close any open pop-ups
      for (let i = 0; i < expandables.length; i++) {
        expandables[i].setAttribute('aria-expanded', 'false')
        expandables[i].parentNode
          .querySelector('.quire-citation__content')
          .setAttribute('hidden', 'hidden')
      }
      let expanded = event.target.getAttribute('aria-expanded')
      if (expanded === 'false') {
        event.target.setAttribute('aria-expanded', 'true')
      } else {
        event.target.setAttribute('aria-expanded', 'false')
      }
      let content = event.target.parentNode.querySelector(
        '.quire-citation__content'
      )
      const contentContainer = content.closest('div.content')
 
      if (content) {
        content.getAttribute('hidden')
        if (typeof content.getAttribute('hidden') === 'string') {
          content.removeAttribute('hidden')
        } else {
          content.setAttribute('hidden', 'hidden')
        }
        setPositionInContainer(content, contentContainer)
      }
    })
  }
  document.addEventListener('click', event => {
    let content = event.target.parentNode
    if (!content) return
    if (
      content.classList.contains('quire-citation') ||
      content.classList.contains('quire-citation__content')
    ) {
      // do nothing
    } else {
      // find all Buttons/Cites
      let citeButtons = document.querySelectorAll('.quire-citation__button')
      let citesContents = document.querySelectorAll('.quire-citation__content')
      // hide all buttons
      if (!citesContents) return
      for (let i = 0; i < citesContents.length; i++) {
        if (!citeButtons[i]) return
        citeButtons[i].setAttribute('aria-expanded', 'false')
        citesContents[i].setAttribute('hidden', 'hidden')
      }
    }
  })
}

/**
 * @description 
 * When a reader copies a URL, this removes the break character that was inserted 
 * as a markdown rendering rule in _plugins/markdown/index.js for better URL line breaks
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
 */
function copyURL() {
  const links = document.querySelectorAll("a");
  const breakCharacter = '​' // zero-width space
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("copy", event => {
      const selection = document.getSelection();
      event.clipboardData.setData("text/plain", selection.toString().replaceAll(breakCharacter, ''));
      event.preventDefault();
    })
  }
}

// Make vocab table sortable
// code provided by Microsoft Copilot 
document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('vocabtable');
  let asc = true;

  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

  const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
  )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

  const clearSortClasses = () => {
    table.querySelectorAll('th').forEach(th => {
      th.classList.remove('sorted-asc', 'sorted-desc');
    });
  };

  table.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {
    const columnIndex = Array.from(th.parentNode.children).indexOf(th);
    Array.from(table.querySelectorAll('tbody > tr'))
      .sort(comparer(columnIndex, asc))
      .forEach(tr => table.querySelector('tbody').appendChild(tr));
    
    clearSortClasses();
    th.classList.add(asc ? 'sorted-asc' : 'sorted-desc');
    asc = !asc;
  }));
});

/**
 * pageSetup
 * @description This function is called after each smoothState reload.
 * Set up page UI elements here.
 */
function pageSetup() {
  copyURL()
  setDate()
  toggleCite()
}

function parseQueryParams() {
  const url = new URL(window.location)
  const uniqueKeys = [...new Set(url.searchParams.keys())]
  return Object.fromEntries(
    uniqueKeys.map((key) => [
      key,
      url.searchParams.getAll(key).map(decodeURIComponent)
    ])
  )
}

// Start
// -----------------------------------------------------------------------------
//
// Run immediately
globalSetup()

// Run when DOM content has loaded
window.addEventListener('load', () => {
  pageSetup()
  scrollToHash(window.location.hash, 75, 'swing')

  // hide loading indicator a given time
  const loadingIndicator = document.getElementById('case-study-loading-indicator')
  if (loadingIndicator) {
    setTimeout(() => {
      loadingIndicator.style.opacity = "0"
    }, 9000);
    setTimeout(() => {
      loadingIndicator.style.display = "none"
    }, 10000);
  }
  
  const params = parseQueryParams()
  /**
   * Accordion Setup
   */
  Accordion.setup()
  /**
   * Canvas Panel Setup
   */
  setUpUIEventHandlers()
  if (window.location.hash) {
    goToFigureState({
      figureId: window.location.hash.replace(/^#/, ''),
      annotationIds: params['annotation-id'],
      region: params['region'] ? params['region'][0] : null,
      sequence: {
        index: params['sequence-index'] ? params['sequence-index'][0] : null,
      },
    })
  }
})
