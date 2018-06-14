const directive = require('./directive'),
      component = require('./component'),
      ssr       = require('./ssr');

module.exports = {
  ssr,
  directive,
  VFragment: component,
  Plugin: {
    install: function(Vue) {
      Vue.directive('fragment', directive)
      Vue.component('v-fragment', component)
    }
  }
}
