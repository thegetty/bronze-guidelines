// This file is added to the project as `type="module"`. Because of this,
// global functions have to be declared as a property of the window object:
//
// window.filterImageGrid = function () { ... }
//
// OR
//
// function filterImageGrid() { ... }
// window.filterImageGrid = filterImageGrid

window.onload = function () {
  const canvasPanels = document.getElementsByTagName('canvas-panel');
  // console.log('canvas panels', canvasPanels)
  for (const canvasPanel of canvasPanels) {
    const choiceButtons = canvasPanel.closest('.q-figure').getElementsByClassName('canvas-choice')
    for (const choiceButton of choiceButtons) {
      choiceButton.addEventListener('click', (event) => {
        if (event.target.classList.contains('canvas-choice--active')) return
        for (const item of choiceButtons) {
          if (item.classList.contains('canvas-choice--active') || item === event.target) {
            item.classList.toggle('canvas-choice--active')
          }
        }
        canvasPanel.makeChoice(event.target.value)
      })
    }
  }

  wrapHeadingNumbers()
  prepImageGrid()

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
  console.log("Heading numbers wrapped")
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
  console.log("Image Grid prepped")
};

// Global function added as property of window object
window.filterImageGrid = function () {
  const filterInput = document.getElementById('image-grid-search').value.toLowerCase();
  const grid = document.getElementById('image-grid');
  const figures = grid.getElementsByClassName('image-grid-figure');
  const resultsDisplay = document.getElementById('image-grid-counter');

  let totalResults = 0
  for (const figure of figures ) {
    const caption = figure.querySelector('.q-figure__caption-content')
    const captionText = caption && caption.textContent ? caption.textContent.toLowerCase() : ''
    if (captionText.indexOf(filterInput) > -1) {
      figure.classList.add('match');
      totalResults++
    } else {
      figure.classList.remove('match');
    }
    resultsDisplay.innerHTML = totalResults + ' images';
  }
};

// From https://inclusive-components.design/collapsible-sections/
// with some modifications:
//
// I added a check to only create the accordion heading button when there was
// content following the heading. This is important in the vocabulary section
// where not all translations have content following them.
//
// I also added:
// .accordion-expander class on button
// .accordion-wrapper class on visible section
//
// And like with the prototype for this book, I'm repeating the code three
// times to get H4, H3, and H2 elements (in that order) but there's surely a
// more efficient way that would avoid all the duplication.

(function() {
  // Get all the <h4> headings
  const headings = document.querySelectorAll('.quire-page.accordion h4')

  Array.prototype.forEach.call(headings, heading => {

    if ( heading.nextElementSibling && heading.nextElementSibling.tagName !== 'H4' ) {

      // Give each <h4> a toggle button child
      // with the SVG plus/minus icon
      heading.innerHTML = `
        <button class="accordion-expander" aria-expanded="false">
          ${heading.innerHTML}
          <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
          </svg>
        </button>
      `

      // Function to create a node list
      // of the content between this <h4> and the next
      const getContent = (elem) => {
        let elems = []
        while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H4' && elem.nextElementSibling.tagName !== 'H3' && elem.nextElementSibling.tagName !== 'H2') {
          elems.push(elem.nextElementSibling)
          elem = elem.nextElementSibling
        }

        // Delete the old versions of the content nodes
        elems.forEach((node) => {
          node.parentNode.removeChild(node)
        })

        return elems
      }

      // Assign the contents to be expanded/collapsed (array)
      let contents = getContent(heading)

      // Create a wrapper element for `contents` and hide it
      let wrapper = document.createElement('section')
      // wrapper.style.display = 'none'
      wrapper.hidden = true

      // Add each element of `contents` to `wrapper`
      contents.forEach(node => {
        wrapper.appendChild(node)
      })

      // Add the wrapped content back into the DOM
      // after the heading
      heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)

      // Assign the button
      let btn = heading.querySelector('button')

      btn.onclick = () => {
        // Cast the state as a boolean
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false

        // Switch the state
        btn.setAttribute('aria-expanded', !expanded)
        // Switch the content's visibility
        wrapper.hidden = expanded
        wrapper.classList.toggle('accordion-wrapper')
      }
    }
  })
})();


(function() {
  // Get all the <h3> headings
  const headings = document.querySelectorAll('.quire-page.accordion h3, div.accordion h3')

  Array.prototype.forEach.call(headings, heading => {

    if ( heading.nextElementSibling && heading.nextElementSibling.tagName !== 'H3' ) {

      // Give each <h3> a toggle button child
      // with the SVG plus/minus icon
      heading.innerHTML = `
        <button class="accordion-expander" aria-expanded="false">
          ${heading.innerHTML}
          <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
          </svg>
        </button>
      `

      // Function to create a node list
      // of the content between this <h3> and the next
      const getContent = (elem) => {
        let elems = []
        while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H3' && elem.nextElementSibling.tagName !== 'H2') {
          elems.push(elem.nextElementSibling)
          elem = elem.nextElementSibling
        }

        // Delete the old versions of the content nodes
        elems.forEach((node) => {
          node.parentNode.removeChild(node)
        })

        return elems
      }

      // Assign the contents to be expanded/collapsed (array)
      let contents = getContent(heading)

      // Create a wrapper element for `contents` and hide it
      let wrapper = document.createElement('section')
      wrapper.hidden = true

      // Add each element of `contents` to `wrapper`
      contents.forEach(node => {
        wrapper.appendChild(node)
      })

      // Add the wrapped content back into the DOM
      // after the heading
      heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)

      // Assign the button
      let btn = heading.querySelector('button')

      btn.onclick = () => {
        // Cast the state as a boolean
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false

        // Switch the state
        btn.setAttribute('aria-expanded', !expanded)
        // Switch the content's visibility
        wrapper.hidden = expanded
        wrapper.classList.toggle('accordion-wrapper')
      }
    }
  })
})();


(function() {
  // Get all the <h2> headings
  const headings = document.querySelectorAll('.quire-page.accordion h2[id=notes]')

  Array.prototype.forEach.call(headings, heading => {

    if ( heading.nextElementSibling && heading.nextElementSibling.tagName !== 'H2' ) {

      // Give each <h2> a toggle button child
      // with the SVG plus/minus icon
      heading.innerHTML = `
        <button class="accordion-expander" aria-expanded="false">
          ${heading.innerHTML}
          <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
          </svg>
        </button>
      `

      // Function to create a node list
      // of the content between this <h2> and the next
      const getContent = (elem) => {
        let elems = []
        while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H3' && elem.nextElementSibling.tagName !== 'H2') {
          elems.push(elem.nextElementSibling)
          elem = elem.nextElementSibling
        }

        // Delete the old versions of the content nodes
        elems.forEach((node) => {
          node.parentNode.removeChild(node)
        })

        return elems
      }

      // Assign the contents to be expanded/collapsed (array)
      let contents = getContent(heading)

      // Create a wrapper element for `contents` and hide it
      let wrapper = document.createElement('section')
      wrapper.hidden = true

      // Add each element of `contents` to `wrapper`
      contents.forEach(node => {
        wrapper.appendChild(node)
      })

      // Add the wrapped content back into the DOM
      // after the heading
      heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)

      // Assign the button
      let btn = heading.querySelector('button')

      btn.onclick = () => {
        // Cast the state as a boolean
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false

        // Switch the state
        btn.setAttribute('aria-expanded', !expanded)
        // Switch the content's visibility
        wrapper.hidden = expanded
        wrapper.classList.toggle('accordion-wrapper')
      }
    }
  })
})();
