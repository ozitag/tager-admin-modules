import type { StoryObj } from "@storybook/vue3-vite";

import Badge from "./Badge.vue";

export default { title: "Badge" };

export const Default: StoryObj = {
  render: () => ({
    components: { Badge },
    template: "<Badge>Hello</Badge>",
  }),
};

export const Color: StoryObj = {
  render: () => ({
    components: { Badge },
    template: '<Badge color="red" text-color="black">Hello</Badge>',
  }),
};

export const Size: StoryObj = {
  render: () => ({
    components: { Badge },
    template: '<Badge :size="20">Hello</Badge>',
  }),
};

export const Empty: StoryObj = {
  render: () => ({
    components: { Badge },
    template: "<Badge/>",
  }),
};
