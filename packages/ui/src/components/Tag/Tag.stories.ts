import { defineComponent } from "vue";
import type { Story } from "@storybook/vue3";

import Tag from "./Tag.vue";

export default { title: "Tag" };

export const Default = () =>
  defineComponent({
    name: "DefaultTag",
    components: { Tag },
    template: `<Tag>Tag</Tag>`,
  });

export const Playground: Story = (args) =>
  defineComponent({
    name: "PlaygroundTag",
    components: { Tag },
    setup() {
      return { args };
    },
    template: `<Tag v-bind="args">{{args.content}}</Tag>`,
  });

Playground.args = {
  content: "Tag",
  closable: true,
};
