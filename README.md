# vue-fragment [![npm version](https://badge.fury.io/js/vue-fragment.svg)](https://badge.fury.io/js/vue-fragment)
## what
a very candide fragment component for Vue.js


## why
If you arrived here, I think you searched hard and you know why you're here.

For others, fragments are basically _root-less_ components. They come useful in many situations where you don't want to pollute the DOM with a useless container, or you want to return many elements at once.

## how
It's impossible to use functional components or slots, since Vue.js vDOM diffing has a "you should return one root element" limitation… Instead, I'm using an (internal) directive which will dump all the children of the fragment root node in its place. Since directives can manipulate DOM, we can act after rendering and bypass Vue limitation.

The component is called `Fragment` so you won't have to change much code when Vue3 native fragments arrive. That said, **I'm not a core developer of Vue.js, and I don't have any view of their implementation. I only know what fragments are and how they should work, and did my best to reproduce it ; so it _should_ be fine.**

## use
-  download the package `npm i -s vue-fragment`

From here, you can:

- Plugin:
    ```
    import Fragment from 'vue-fragment'
    Vue.use(Fragment.Plugin)

    // or

    import { Plugin } from 'vue-fragment'
    Vue.use(Plugin)

    // …

    export const MyComponent {
      template: '
      <fragment>
        <input type="text" v-model="message">
        <span>{{ message }}</span>
      </fragment>
      ',
      data() { return { message: 'hello world }}
    }
    ```

- Component:
    ```
    import { Fragment } from 'vue-fragment'

    export const MyComponent {
      components: { Fragment },
      template: '
      <fragment>
        <input type="text" v-model="message">
        <span>{{ message }}</span>
      </fragment>
      ',
      data() { return { message: 'hello world }}
    }
    ```
