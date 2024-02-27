//
// CUSTOMIZED FILE -- Bronze Guidelines
// Scripts for iframe-based image viewer
// 
window['toggleViewer'] = () => {
  var div = document.getElementById('iframe-viewer');
  div.style.display = div.style.display == "none" ? "block" : "none";
}

window['toggleTextSize'] = () => {
  const myIFrame = document.getElementById('object-iframe');
  const mains = myIFrame.contentDocument.getElementsByTagName('main');
  mains[0].classList.toggle("table-zoom")
}

window['updateViewer'] = () => {
  // Update iframe page styles 
  const myIFrame = document.getElementById('object-iframe');
  let textSizeButton = document.getElementById('iframe-toggle-size');
  myIFrame.addEventListener("load", function() {
    const iframeDocumentHead = this.contentDocument.head;
    const iframeCssLink = document.createElement("link");
    iframeCssLink.href = "/_assets/styles/iframe-viewer.css"; 
    iframeCssLink.rel = "stylesheet"; 
    iframeCssLink.type = "text/css"; 
    iframeDocumentHead.appendChild(iframeCssLink);
    
    // Display textSizeButton if it's a table
    const iframeMains = this.contentDocument.getElementsByTagName('main');
    textSizeButton.style.display = iframeMains[0].classList.contains('tables-page') 
      ? "flex"
      : "none"
  });

  // Update Prev / Next Links
  var nav = document.getElementById('iframe-nav');
  nav.innerHTML = '';
  const pageObjectLinks = document.querySelectorAll("a.object-link")
  const currentObjectHref = event.target.getAttribute('href')
  let hrefArrayAll = []
  for (var index = 0; index < pageObjectLinks.length; ++index) {
    hrefArrayAll.push(pageObjectLinks[index].getAttribute('href'))
  }
  let hrefArrayUnique = [...new Set(hrefArrayAll)];
  const currentObjectIndex = hrefArrayUnique.indexOf(currentObjectHref)
  const prevObjectIndex = currentObjectIndex == 0 ? hrefArrayUnique.length - 1 : currentObjectIndex - 1
  const nextObjectIndex = currentObjectIndex == hrefArrayUnique.length - 1 ? 0 : currentObjectIndex + 1

  const prevButton = document.createElement("a");
  prevButton.href = hrefArrayUnique[prevObjectIndex]
  prevButton.setAttribute('aria-label', 'Previous image')
  prevButton.setAttribute('target', 'object-iframe')
  prevButton.classList.add('iframe-control')
  prevButton.addEventListener('click', updateViewer)

  const nextButton = document.createElement("a");
  nextButton.href = hrefArrayUnique[nextObjectIndex]
  nextButton.setAttribute('aria-label', 'Next image')
  nextButton.setAttribute('target', 'object-iframe')
  nextButton.classList.add('iframe-control')
  nextButton.addEventListener('click', updateViewer)
  
  nav.prepend(nextButton)
  nav.prepend(prevButton)  
}

window.addEventListener('load', () => {
  const objectLinks = document.querySelectorAll("a[target='object-iframe']:not(.button)")
  for (var index = 0; index <= objectLinks.length; ++index) {
    objectLinks[index].addEventListener('click', updateViewer)
    objectLinks[index].addEventListener('click', toggleViewer)
  }
})
