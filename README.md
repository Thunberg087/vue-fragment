# vue-fragment
## what
a very candide fragment component for Vue.js

## why
If you arrived here, I think you searched hard and you know why you're here.

For others, fragments are basically _root-less_ components. They come useful in many situations where you don't want to pollute the DOM with a useless container, or you want to return many elements at once.

### How
It's impossible to use functional components or slots, since it's all about vDOM and there is a "you should return one root element" limitation… So, I'm using an (internal) directive which will dump all the children of the fragment root node at its place. Since directives can manipulate DOM, we can bypass Vue limitation.

TL;DR : I'm adding a `Fragment` component `<fragment />`. It's not perfect, but it works.

**The component is called `Fragment` so you won't have to change much code when Vue3 native fragments arrive. That said, I'm not a core developer of Vue.js, and I don't have any view of their implementation. I only know what fragments are and how they should work, and did my best to reproduce it ; so it _should_ be fine.**

### Use
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
      components: { VFragment },
      template: '
      <fragment>
        <input type="text" v-model="message">
        <span>{{ message }}</span>
      </fragment>
      ',
      data() { return { message: 'hello world }}
    }
    ```
