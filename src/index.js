import component, { freeze, unfreeze } from './component'
import ssr from './ssr'

export const Fragment = component

export const SSR = ssr

export const Plugin = {
  install: function (Vue) {
    const orgRemoveChild = window.Node.prototype.removeChild
    window.Node.prototype.removeChild = function (node) {
      if (this.__isFragment) {
        if (this.parentNode) {
          let ret = this.parentNode.removeChild(node)
          unfreeze(node, 'parentNode')
          return ret
        }
      } else if (node.__isFragment && node.__isMounted) {
        while (node.__head.nextSibling !== node.__tail) orgRemoveChild.call(this, node.__head.nextSibling)

        orgRemoveChild.call(this, node.__head)
        orgRemoveChild.call(this, node.__tail)
        let prev = node.__head.previousSibling,
          next = node.__tail.nextSibling
        if (prev) freeze(prev, 'nextSibling', next)
        if (next) freeze(next, 'previousSibling', prev)

        unfreeze(node, 'parentNode')
        return node
      } else {
        let prev = node.previousSibling,
          next = node.nextSibling
        let ret = orgRemoveChild.call(this, node)
        if (prev) freeze(prev, 'nextSibling', next)
        if (next) freeze(next, 'previousSibling', prev)
        return ret
      }
    }

    const orgInsertBefore = window.Node.prototype.insertBefore
    window.Node.prototype.insertBefore = function (node, ref, inFragment = false) {
      let realRef = !!ref && !!ref.__isFragment && !!ref.__isMounted ? ref.__head : ref
      if (this.__isFragment) {
        let notFrChild = !node.hasOwnProperty('__isFragmentChild__'),
          freezeParent = !inFragment || notFrChild

        notFrChild && freeze(node, '__isFragmentChild__', true)
        let ret = this.parentNode ? this.parentNode.insertBefore(node, ref) : orgInsertBefore.call(this, node, realRef)
        freezeParent && freeze(node, 'parentNode', this)

        return ret
      } else if (node.__isFragment && node.__isMounted) {
        if (node === ref) {
          console.error('something must be wrong')
          return
        }
        freeze(node, 'parentNode', this)
        if (node.previousSibling) freeze(node.previousSibling, 'nextSibling', node.nextSibling)
        if (node.nextSibling) freeze(node.nextSibling, 'previousSibling', node.previousSibling)
        freeze(node, 'nextSibling', ref)
        freeze(node, 'previousSibling', ref.previousSibling)
        if (ref.previousSibling) freeze(ref.previousSibling, 'nextSibling', node)
        freeze(ref, 'previousSibling', node)

        let tpl = document.createDocumentFragment(),
          ele = node.__head
        while (ele !== node.__tail) {
          tpl.appendChild(ele)
          ele = ele.nextSibling
        }
        tpl.appendChild(node.__tail)
        orgInsertBefore.call(this, tpl, realRef)
        return node
      } else {
        return orgInsertBefore.call(this, node, realRef)
      }
    }

    const orgAppendChild = window.Node.prototype.appendChild
    window.Node.prototype.appendChild = function (node, inFragment = false) {
      if (this.__isFragment) {
        if (this.parentNode) {
          let notFrChild = !node.hasOwnProperty('__isFragmentChild__'),
            freezeParent = !inFragment || notFrChild

          notFrChild && freeze(node, '__isFragmentChild__', true)
          let ret = this.parentNode.insertBefore(node, this.__tail, inFragment)
          freezeParent && freeze(node, 'parentNode', this)

          return ret
        }
      } else {
        return orgAppendChild.call(this, node)
      }
    }
    Vue.component('Fragment', component)
  },
}

export default {
  Fragment,
  Plugin,
  SSR,
}
