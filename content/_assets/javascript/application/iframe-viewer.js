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
  const currentFigureHref = event.target.getAttribute('href')
  let hrefArrayAll = []
  for (var index = 0; index < figureLinks.length; ++index) {
    hrefArrayAll.push(figureLinks[index].getAttribute('href'))
  }
  let hrefArrayUnique = [...new Set(hrefArrayAll)];
  const currentFigureIndex = hrefArrayUnique.indexOf(currentFigureHref)
  const prevFigureIndex = currentFigureIndex == 0 ? hrefArrayUnique.length - 1 : currentFigureIndex - 1
  const nextFigureIndex = currentFigureIndex == hrefArrayUnique.length - 1 ? 0 : currentFigureIndex + 1

  const prevButton = document.createElement("a");
  prevButton.href = hrefArrayUnique[prevFigureIndex]
  prevButton.setAttribute('aria-label', 'Previous image')
  prevButton.setAttribute('target', 'iframe_viewer__iframe')
  prevButton.classList.add('iframe-control')
  prevButton.addEventListener('click', updateViewer)

  const nextButton = document.createElement("a");
  nextButton.href = hrefArrayUnique[nextFigureIndex]
  nextButton.setAttribute('aria-label', 'Next image')
  nextButton.setAttribute('target', 'iframe_viewer__iframe')
  nextButton.classList.add('iframe-control')
  nextButton.addEventListener('click', updateViewer)
  
  nav.prepend(nextButton)
  nav.prepend(prevButton)  
}

window.addEventListener('load', () => {
  const figureLinks = document.querySelectorAll("a[target='iframe_viewer__iframe']:not(.button)")
  for (var index = 0; index <= figureLinks.length; ++index) {
    figureLinks[index].addEventListener('click', updateViewer)
    figureLinks[index].addEventListener('click', toggleViewer)
  }
})

