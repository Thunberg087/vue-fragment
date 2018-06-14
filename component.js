const directive = require('./directive');

module.exports = {
  functional: true,
  render: function(h, context) {
    return h(
      'div', {
        attrs: { class: 'fragment' },
        directives: { fragment: directive }
      },
      [context.children]
    )
  }
}
