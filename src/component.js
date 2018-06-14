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
  directives: { 'fragment': directive },
  template: `<div class='v-fragment' v-fragment><slot /></div>`
}
