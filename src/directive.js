const process = root => {
  const fragment = document.createDocumentFragment();

  Array.from(root.childNodes)
    .forEach((child, i) => fragment.appendChild(child))

  if (root._ns_) {
    root._pn_.insertBefore(fragment, root._ns_);
  }
  else {
    root._pn_.appendChild(fragment);  
  }

  if (root.parentNode)
    root._pn_.removeChild(root);
}

export default {
  inserted: function(root) {
    root._pn_ = root.parentNode;
    root._ns_ = root.nextElementSibling;

    process(root);
  },
  
  componentUpdated(root) {
    process(root);
  }
}
