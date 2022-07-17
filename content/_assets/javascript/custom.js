// Use this file to add custom JavaScript
//
// A number of JavaScript functions and libraries are included with Quire,
// to see which ones, check the files in themes/quire-starter-theme/source/js // and the list of dependencies in themes/quire-starter-theme/package.json

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

// Wrap heading section numbers in spans so they can be styled when indented
window.onload = function () {
  const headings = document.querySelectorAll('.quire-page.full-width h2, .quire-page.full-width h3, .quire-page.full-width h4');
  const regex = /^\s*([0-9|\.]+\s+)/
  const replace = '<span class="section-number">$1 </span>'

  for (const heading of headings) {
    const node = heading.firstElementChild && heading.firstElementChild.tagName == 'button' ? heading.firstElementChild : heading
    const nodeText = node.innerHTML

    if ( regex.test(nodeText) ) {
      node.innerHTML = nodeText.replace(regex, replace)
      heading.classList.add('indented-heading')
    }
  }
}
