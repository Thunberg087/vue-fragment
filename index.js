export default {
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
      template: `<div v-fragment><slot /></div>`
    })
  }
}
