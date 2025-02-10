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

window.toggleControlsVisibility = function () {
  const accordions = document.getElementsByClassName('accordion-section')
  const firstAccordion = accordions[0]
  const lastAccordion = accordions[accordions.length - 1]

  const accordionControls = document.getElementsByClassName('global-accordion-controls')

  // https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/
  const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };

  if ( (elementIsVisibleInViewport(firstAccordion, true) && (window.scrollY !== 0)) || (elementIsVisibleInViewport(lastAccordion, true) ) ) {
    accordionControls[0].classList.add('show-controls')
  } else if ( window.scrollY == 0 ) {
    accordionControls[0].classList.remove('show-controls')
  }
};

function wrapHeadingNumbers() {
  // Wrap heading section numbers in spans so they can be styled when indented
  const headingsToo = document.querySelectorAll('.indented-heading');
  const regex = /^\s*([0-9|\.]+\s+)/
  const replace = '<span class="section-number">$1 </span>'
  for (const heading of headingsToo) {
    const text = heading.innerHTML
    if ( regex.test(text) ) {
      heading.innerHTML = text.replace(regex, replace)
    }
  }
  const headings = document.querySelectorAll('.quire-page.full-width .accordion-section__heading');
  for (const heading of headings) {
    const node = heading.lastElementChild
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

window.addEventListener('scroll', toggleControlsVisibility)

// Was originally triggering these with window.onload = function () {...}
// bit it was breaking the Canvas Panel choices functionality, not sure why
window.addEventListener('DOMContentLoaded', () => {
  wrapHeadingNumbers()
  prepImageGrid()
});
