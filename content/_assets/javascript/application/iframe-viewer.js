//
// CUSTOMIZED FILE -- Bronze Guidelines
// Scripts for iframe-based image viewer
// 
window['toggleViewer'] = () => {
  var div = document.getElementById('iframe-viewer');
  div.style.display = div.style.display == "none" ? "block" : "none";
}

window['updateViewer'] = () => {

  // Update iframe page styles
  var myIFrame = document.getElementById('iframe');
  myIFrame.addEventListener("load", function() {
    const iframeDocumentHead = this.contentDocument.head;
    const iframeCssLink = document.createElement("link");
    iframeCssLink.href = "/_assets/styles/iframe-viewer.css"; 
    iframeCssLink.rel = "stylesheet"; 
    iframeCssLink.type = "text/css"; 
    iframeDocumentHead.appendChild(iframeCssLink);
  });

  // Update Prev / Next Links
  var nav = document.getElementById('iframe-nav');
  nav.innerHTML = '';
  const figureLinks = document.querySelectorAll("a[target='iframe_viewer__iframe']:not(.iframe-control)")
  const currentFigureIndex = parseInt(event.target.getAttribute('data-index'))
  const prevFigureIndex = currentFigureIndex == 0 ? figureLinks.length - 1 : currentFigureIndex - 1
  const nextFigureIndex = currentFigureIndex == figureLinks.length - 1 ? 0 : currentFigureIndex + 1
  const prevButton = figureLinks[prevFigureIndex].cloneNode(true)
  const nextButton = figureLinks[nextFigureIndex].cloneNode(true)

  prevButton.innerHTML = ''
  prevButton.setAttribute('aria-label', 'Previous image')
  prevButton.classList.add('iframe-control')
  prevButton.addEventListener('click', updateViewer)

  nextButton.innerHTML = ''
  nextButton.setAttribute('aria-label', 'Next image')
  nextButton.classList.add('iframe-control')
  nextButton.addEventListener('click', updateViewer)
  
  nav.prepend(nextButton)
  nav.prepend(prevButton)  
}

window.addEventListener('load', () => {
  const figureLinks = document.querySelectorAll("a[target='iframe_viewer__iframe']:not(.button)")
  for (var index = 0; index <= figureLinks.length; ++index) {
    figureLinks[index].setAttribute('data-index', index)
    figureLinks[index].addEventListener('click', updateViewer)
    figureLinks[index].addEventListener('click', toggleViewer)
  }
})

