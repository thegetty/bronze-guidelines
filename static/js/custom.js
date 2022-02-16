// To Filter the image grid in the Visual Atlas of Features
// Filters based on the figure caption text
// Modified from https://www.w3schools.com/howto/howto_js_filter_lists.asp
//
function filterImageGrid() {

  var input, filter, grid, figure, count, counter, caption, i, captionValue, results;
  input = document.getElementById("image-grid-search");
  filter = input.value.toLowerCase();
  grid = document.getElementById("image-grid");
  figure = grid.getElementsByClassName("grid-figure");
  counter = document.getElementById("image-grid-counter");

  // Loop through the figures, and hide those that don't match the search query
  count = 0;
  for (i = 0; i < figure.length; i++) {
    caption = figure[i].getElementsByClassName("quire-figure__caption-content")[0];
    captionValue = caption.textContent || caption.innerText;
    if (captionValue.toLowerCase().indexOf(filter) > -1) {
      figure[i].classList.add("match");
      count++;
    } else {
      figure[i].classList.remove("match");
    }
    // Count figures that are showing and display the result
    counter.innerHTML = count + " images";
  }
}

// From https://inclusive-components.design/collapsible-sections/
// with some modifications:
//
// I added a check to only create the accordion heading button when there was
// content following the heading. This is important in the vocabulary section
// where not all translations have content following them.
//
// I also added:
// .accordion-expander class on button
// .display-accordion class on visible div
//
// And like with the prototype for this book, I'm repeating the code three
// times to get H4, H3, and H2 elements (in that order) but there's surely a
// more efficient way that would avoid all the duplication.

(function() {
  // Get all the <h4> headings
  const headings = document.querySelectorAll('.quire-page--accordion .content h4')

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
      let wrapper = document.createElement('div')
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
        wrapper.classList.toggle('display-accordion')
      }
    }
  })
})();


(function() {
  // Get all the <h3> headings
  const headings = document.querySelectorAll('.quire-page--accordion .content h3, .quire-page .content .accordion h3')

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
      let wrapper = document.createElement('div')
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
        wrapper.classList.toggle('display-accordion')
      }
    }
  })
})();


(function() {
  // Get all the <h2> headings
  const headings = document.querySelectorAll('.quire-page--accordion .content h2[id=notes]')

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
      let wrapper = document.createElement('div')
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
        wrapper.classList.toggle('display-accordion')
      }
    }
  })
})();
