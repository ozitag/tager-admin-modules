import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import PageTitle from "./PageTitle.vue";

export default { title: "PageTitle" };

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      name: "PlaygroundPageTitle",
      components: { PageTitle },
      setup() {
        return { args };
      },
      template: `<PageTitle>{{args.content}}</PageTitle>`,
    }),

  args: {
    content: "Some page title",
  },
};
