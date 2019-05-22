const freeze = (object, property, value) => {
  Object.defineProperty(object, property, {
    configurable: true,
    get() { return value; },
    set(v) { console.warn(`tried to set frozen property ${property} with ${v}`) }
  });
};

const unfreeze = (object, property, value = null) => {
  Object.defineProperty(object, property, {
    configurable: true,
    writable: true,
    value: value
  });
};



export default {
  abstract: true,
  name: 'Fragment',

  props: {
    name: {
      type: String,
      default: () => Math.floor(Date.now() * Math.random()).toString(16)
    }
  },

  mounted() {
    const container = this.$el;
    const parent = container.parentNode;

    container.__isFragment = true
    container.__isMounted = false

    const head = document.createComment(`fragment#${this.name}#head`)
    const tail = document.createComment(`fragment#${this.name}#tail`)

    container.__head = head
    container.__tail = tail

    parent.insertBefore(head, container)
    parent.insertBefore(tail, container)

    container.appendChild = (node) => {
      parent.insertBefore(node, tail)
      freeze(node, 'parentNode', container)
    }

    container.insertBefore = (node, ref) => {
      parent.insertBefore(node, ref)
      freeze(node, 'parentNode', container)
    }

    container.removeChild = (node) => {
      parent.removeChild(node)
      unfreeze(node, 'parentNode')
    }

    Array.from(container.childNodes)
      .forEach(node => container.appendChild(node))

    parent.removeChild(container)

    freeze(container, 'parentNode', parent)
    freeze(container, 'nextSibling', tail.nextSibling)
    if (tail.nextSibling)
      freeze(tail.nextSibling, 'previousSibling', container)

    container.__isMounted = true

    if (!parent.__isFragmentParent) {
      parent.__isFragmentParent = true
      const insertBefore = parent.insertBefore;
      parent.insertBefore = (node, ref) => {
        let realRef = !!ref.__isFragment && !!ref.__isMounted ? ref.__head : ref
        if (node.__isFragment && node.__isMounted) {
          if (node === ref) {
            console.error("something must be wrong")
            return
          }
          freeze(node, 'parentNode', parent)
          if (node.previousSibling)
            freeze(node.previousSibling, 'nextSibling', node.nextSibling)
          if (node.nextSibling)
            freeze(node.nextSibling, 'previousSibling', node.previousSibling)
          freeze(node, 'nextSibling', ref)
          freeze(node, 'previousSibling', ref.previousSibling)
          if (ref.previousSibling)
            freeze(ref.previousSibling, 'nextSibling', node)
          freeze(ref, 'previousSibling', node)

          let children = []
          let ele = node.__head
          while (ele !== node.__tail) {
            children.push(ele)
            ele = ele.nextSibling
          }
          children.push(node.__tail)
          for (let child of children) {
            insertBefore.call(parent, child, realRef)
          }
        } else
          insertBefore.call(parent, node, realRef)
      }

        
      const removeChild = parent.removeChild;
      parent.removeChild = (node) => {
        if (node.__isFragment && node.__isMounted) {
          while (node.__head.nextSibling !== node.__tail)
            node.removeChild(node.__head.nextSibling)// container.removeChild(head.nextSibling)

          parent.removeChild(node.__head)
          parent.removeChild(node.__tail)
          unfreeze(container, 'parentNode')

          // parent.insertBefore = insertBefore
          // parent.removeChild = removeChild
        } else {
          removeChild.call(parent, node)
        }
      }
    }
  },

  render(h) {
    const children = this.$slots.default

    // add fragment attribute on the children
    if (children && children.length)
      children.forEach(child =>
        child.data = { ...child.data, attrs: { fragment: this.name, ...(child.data || {}).attrs } }
      )

    return h(
      "div",
      { attrs: { fragment: this.name } },
      children
    )
  }
};
