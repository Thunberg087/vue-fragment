export const freeze = (object, property, value) => {
  Object.defineProperty(object, property, {
    configurable: true,
    get() { return value; },
    set(v) { console.warn(`tried to set frozen property ${property} with ${v}`) }
  });
};

export const unfreeze = (object, property, value = null) => {
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
    },
    html: {
      type: String,
      default: null
    }
  },

  mounted() {
    const container = this.$el
    const parent = container.parentNode

    container.__isFragment = true
    container.__isMounted = false

    const head = document.createComment(`fragment#${this.name}#head`)
    const tail = document.createComment(`fragment#${this.name}#tail`)

    container.__head = head
    container.__tail = tail
    
    // use document fragment to improve efficiency
    let tpl = document.createDocumentFragment()
    tpl.appendChild(head)
    
    Array.from(container.childNodes)
        .forEach(node => {
            // container.appendChild(node, true)
            let notFrChild = !node.hasOwnProperty('__isFragmentChild__')
            tpl.appendChild(node)
            if (notFrChild) {
                freeze(node, 'parentNode', container)
                freeze(node, '__isFragmentChild__', true)
            }
        })

    tpl.appendChild(tail)

    // embed html
    if (this.html) {
      let template = document.createElement('template')
      template.innerHTML = this.html
      // copy elements over
      Array.from(template.content.childNodes).forEach(node => {      
        tpl.appendChild(node)
      })
    }

    let next = container.nextSibling
    parent.insertBefore(tpl, container, true)
    parent.removeChild(container)
    freeze(container, 'parentNode', parent)
    freeze(container, 'nextSibling', next)
    if (next)
        freeze(next, 'previousSibling', container)

    container.__isMounted = true
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
