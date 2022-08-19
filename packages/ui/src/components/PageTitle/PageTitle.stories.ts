import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import PageTitle from "./PageTitle.vue";

export default { title: "PageTitle" };

export const Playground: StoryFn = (args) =>
  defineComponent({
    name: "PlaygroundPageTitle",
    components: { PageTitle },
    setup() {
      return { args };
    },
    template: `<PageTitle>{{args.content}}</PageTitle>`,
  });

Playground.args = {
  content: "Some page title",
};
