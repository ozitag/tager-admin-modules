import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import Tag from "./Tag.vue";

export default { title: "Tag" };

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      name: "DefaultTag",
      components: { Tag },
      template: `<Tag>Tag</Tag>`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      name: "PlaygroundTag",
      components: { Tag },
      setup() {
        return { args };
      },
      template: `<Tag v-bind="args">{{args.content}}</Tag>`,
    }),

  args: {
    content: "Tag",
    closable: true,
  },
};
