export default {
  install(Vue) {
    Vue.directive('fragment', {
      inserted(element) {
      	Array.from(element.childNodes).forEach(child =>
          element.parentNode.insertBefore(child, element)
        )
        
        element.parentNode.removeChild(element)
      }
    })

    Vue.component('vue-fragment', {
      template: `<div v-fragment><slot /></div>`
    })
  }
}
