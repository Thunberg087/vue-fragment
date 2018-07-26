import directive from './directive'

/*
// wait for PR 'assets for functional components' to pass
export default {
  functional: true,
  directives: {
    'fragment': directive
  },
  render: function(h, context) {
    return h(
      'div', {
        attrs: { class: 'fragment' },
        directives: [{ name: 'fragment' }]
      },
      [context.children]
    )
  }
}
*/

export default {
  abstract: true,
  directives: { 'fragment': directive },
  render: function(h) {
    return h(
      'div', {
        attrs: { class: 'v-fragment' },
        directives: [{ name: 'fragment' }]
      },
      [this.$slots.default]
    )
  }
}
