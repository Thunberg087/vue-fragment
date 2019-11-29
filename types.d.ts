import Vue, { PluginObject, ComponentOptions, AsyncComponent } from "vue";

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;

export const Fragment: Component;
export const Plugin: PluginObject<undefined>;

declare namespace VueFragment {
  export const Fragment: Component;
  export const Plugin: PluginObject<undefined>;
}

export as namespace VueFragment;
