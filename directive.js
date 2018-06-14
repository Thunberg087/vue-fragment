module.exports = {
  inserted: function(element) {
    const fragment = document.createDocumentFragment();

    Array.from(element.childNodes)
         .forEach(child => fragment.appendChild(child));

    element.parentNode.insertBefore(fragment, element);
    element.parentNode.removeChild(element);
  }
}
