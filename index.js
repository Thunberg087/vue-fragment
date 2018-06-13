module.exports = {
  install(Vue) {
    Vue.directive('fragment', {
      inserted(element) {
        const fragment = document.createDocumentFragment();
        Array.from(element.childNodes).forEach(child => fragment.appendChild(child));
        element.parentNode.insertBefore(fragment, element);
        element.parentNode.removeChild(element);
      }
    })

    Vue.component('vue-fragment', {
      functional: true,
      render(h, { children }) {
        return h(
          'div', {
            attrs: { class: 'fragment' },
            directives: [{ name: 'fragment' }]
          },
          [children]
        )
      }
    })
  }
}
