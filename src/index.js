import component from './component'
import ssr       from './ssr'

export const Fragment = component

export const SSR = ssr

export const Plugin = {
  install: function(Vue) {
    Vue.component('Fragment', component)
  }
}

export default {
  Fragment, Plugin, SSR
}
