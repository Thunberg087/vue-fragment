# vue-fragments
## what
a very candide fragment component for VueJS

## why
It is handy. if you arrived here, i think you searched hard and you know why you're here.
For others, fragments are basically _root-less_ components. They come useful in many situations where you don't want to pollute the DOM, or you semantically return many elements at once.

### How
It's impossible to use functional components or slots, since it's all about vDOM and there is a "you should return one root element" limitation... So, I'm using a directive called `v-fragment` which will dump all children of the target node into its parent at the time of insertion. That's it. Directives can manipulate DOM, so we can bypass that.

Also, for semantics, I'm adding a `vue-fragment` component so you can use a meaningful `<vue-fragment />` instead of `<div v-fragment />` (but it's literally the same).

### Use
1. download the package `npm install vue-fragment`
2. install the plugin 
    ```
    import FragmentPlugin from 'vue-fragment'
    Vue.use(FragmentPlugin)
    ```
3. use it everywhere
    ```
    export const MyComponent {
      template: '
      <vue-fragment>
        <input type="text" v-model="message">
        <span>{{ message }}</span>
      </vue-fragment>
      ',
      data() { return { message: 'hello world }}
    }
   ```

_By the way, i cannot use "vue-fragment" because [it's parked](https://www.npmjs.com/package/vue-fragment) on npm. sorry for that._