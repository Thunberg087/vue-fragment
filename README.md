# vue-fragment
## what
a very candide fragment component for Vue.js

## why
If you arrived here, I think you searched hard and you know why you're here.

For others, fragments are basically _root-less_ components. They come useful in many situations where you don't want to pollute the DOM, or you semantically return many elements at once.

### How
It's impossible to use functional components or slots, since it's all about vDOM and there is a "you should return one root element" limitation… So, I'm using an (internal) directive which will dump all children of the target node into its parent at the time of insertion. Since directives can manipulate DOM, we can bypass that limitation.

TL;DR : I'm adding a `Fragment` component `<fragment />`.

**The component is called `Fragment` after interesting discussions in issues/ about supporting a smooth transition to Vue3 native fragments.**

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
