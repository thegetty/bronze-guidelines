//
// CUSTOMIZED FILE -- Bronze Guidelines
//
// This file is added to the project as `type="module"`. Because of this,
// global functions have to be declared as a property of the window object:
//
// window.filterImageGrid = function () { ... }
//
// OR
//
// function filterImageGrid() { ... }
// window.filterImageGrid = filterImageGrid

// Accordion sections modified from
// https://inclusive-components.design/collapsible-sections/
function createAccordion(selector) {
  const tag = selector.match(/h[1-6]/)[0].toUpperCase()
  const headings = document.querySelectorAll(selector)
  for ( const heading of headings ) {
    if (
      heading.nextElementSibling && heading.nextElementSibling.tagName !== tag ) {
      heading.innerHTML = `
        <button class="accordion-expander" aria-expanded="false">
          ${heading.innerHTML}
          <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="1.5" y="1" x="4.25"/>
            <rect height="1.5" width="8" y="4.25" x="1"/>
          </svg>
        </button>`

      const tags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
      const slice = tag.match(/[0-9]/)
      const higherHeads = tags.slice( 0, slice )
      const getContent = (elem) => {
        let elems = []
        while (elem.nextElementSibling && !higherHeads.includes(elem.nextElementSibling.tagName) ) {
          elems.push(elem.nextElementSibling)
          elem = elem.nextElementSibling
        }
        elems.forEach((node) => {
          node.parentNode.removeChild(node)
        })
        return elems
      }
      let contents = getContent(heading)
      let wrapper = document.createElement('section')
      wrapper.hidden = true
      contents.forEach(node => {
        wrapper.appendChild(node)
      })
      heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)

      let btn = heading.querySelector('button')
      btn.onclick = () => {
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false
        btn.setAttribute('aria-expanded', !expanded)
        wrapper.hidden = expanded
        wrapper.classList.toggle('accordion-wrapper')
      }
    }
  }
  // headings.length > 0 ? console.log("Accordion sections made on select " + tag + " tags") : ''
  if (headings.length > 0) {
    console.log("Accordion sections made on select " + tag + " tags")
    addAccordionControls()
  }

};

function addAccordionControls() {
  const accordion = document.getElementsByClassName('accordion')
  const existingControls = document.getElementById('accordion-controls')
  if ( accordion[0] && !existingControls ) {
    const controls = `
      <li><button id="expand-accordions">Expand All</button></li>
      <li><button id="collapse-accordions">Collapse All</button></li>
    `
    const controlWrapper = document.createElement('ul')
    controlWrapper.setAttribute('aria-label', 'section controls')
    controlWrapper.setAttribute('id', 'accordion-controls')
    controlWrapper.innerHTML = controls

    accordion[0].prepend(controlWrapper)

    document.getElementById('expand-accordions').addEventListener('click', expandAllAccordions)

    document.getElementById('collapse-accordions').addEventListener('click', collapseAllAccordions)

    window.addEventListener('scroll', toggleControlsVisibility)

    console.log("Accordion controls added")
  }
};
window.expandAllAccordions = function () {
  const buttons = document.querySelectorAll('button.accordion-expander')
  for (const button of buttons) {
    button.setAttribute('aria-expanded', 'true')
    const section = button.parentNode.nextElementSibling
    section.hidden = false
    section.classList.add('accordion-wrapper')
  }
};
window.collapseAllAccordions = function () {
  const buttons = document.querySelectorAll('button.accordion-expander')
  for (const button of buttons) {
    button.setAttribute('aria-expanded', 'false')
    const section = button.parentNode.nextElementSibling
    section.hidden = true
    section.classList.remove('accordion-wrapper')
  }
};
window.toggleControlsVisibility = function () {
  const accordions = document.getElementsByClassName('accordion-expander')
  const firstAccordion = accordions[0]

  const accordionControls = document.getElementById('accordion-controls')

  if ( isInViewport(firstAccordion) && (window.scrollY !== 0) ) {
    accordionControls.classList.add('show-controls')
  } else if ( window.scrollY == 0 ) {
    accordionControls.classList.remove('show-controls')
  }
};
// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

function wrapHeadingNumbers() {
  // Wrap heading section numbers in spans so they can be styled when indented
  const headings = document.querySelectorAll('.quire-page.full-width h2, .quire-page.full-width h3, .quire-page.full-width h4');
  const regex = /^\s*([0-9|\.]+\s+)/
  const replace = '<span class="section-number">$1 </span>'
  for (const heading of headings) {
    heading.classList.add('query-selected')
    const node = heading.firstElementChild && heading.firstElementChild.tagName == 'BUTTON' ? heading.firstElementChild : heading
    const nodeText = node.innerHTML
    if ( regex.test(nodeText) ) {
      node.innerHTML = nodeText.replace(regex, replace)
      heading.classList.add('indented-heading')
    }
  }
  headings.length > 0 ? console.log("Heading numbers wrapped") : ''
};

function prepImageGrid() {
  const imageGrid = document.getElementById("image-grid")
  if (imageGrid) {
    // Remove "Figure" from figure labels in Image Grid page
    const imageGridLabels = imageGrid.querySelectorAll(".q-figure__label-text")
    for (const label of imageGridLabels) {
      const text = label.innerHTML
      label.innerHTML = text.replace("Figure ", "")
    }

    // Add event listener to Image Grid search box
    document.getElementById('image-grid-search').addEventListener('keyup', filterImageGrid)

    // Add initial image count for items in the Image Grid
    const images = imageGrid.getElementsByClassName('image-grid-figure')
    const resultsDisplay = document.getElementById('image-grid-counter')
    resultsDisplay.innerHTML = images.length + ' images'
  }
  imageGrid ? console.log("Image Grid prepped") : ''
};

// Global function added as property of window object
window.filterImageGrid = function () {
  const filterInput = document.getElementById('image-grid-search').value.toLowerCase();
  const grid = document.getElementById('image-grid');
  const figures = grid.getElementsByClassName('image-grid-figure');
  const resultsDisplay = document.getElementById('image-grid-counter');

  let totalResults = 0
  for (const figure of figures ) {
    const labelText = figure.querySelector('.q-figure__label-text').textContent.toLowerCase()
    const captionText = figure.querySelector('.q-figure__caption-content').textContent.toLowerCase()

    const figureInfo = labelText.concat(': ', captionText)

    if (figureInfo.indexOf(filterInput) > -1) {
      figure.classList.add('match');
      totalResults++
    } else {
      figure.classList.remove('match');
    }
    resultsDisplay.innerHTML = totalResults + ' images';
  }
};

// Was originally triggering these with window.onload = function () {...}
// bit it was breaking the Canvas Panel choices functionality, not sure why
window.addEventListener('DOMContentLoaded', () => {
  createAccordion('.quire-page.accordion.full-width h4')
  createAccordion('.quire-page.accordion.full-width h3')
  createAccordion('.quire-page.accordion.full-width h2[id=notes]')
  createAccordion('.quire-page.accordion.interview h2')
  createAccordion('div.accordion h3')

  wrapHeadingNumbers()
  prepImageGrid()
});
