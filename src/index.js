import directive from './directive'
import component from './component'
import ssr       from './ssr'

export default {
  ssr,
  directive,
  component,
  Plugin: {
    install: function(Vue) {
      Vue.directive('fragment', directive)
      Vue.component('v-fragment', component)
    }
  }
}
