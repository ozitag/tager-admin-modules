import { defineComponent } from "vue";
import type { StoryFn } from "@storybook/vue3";

import ToggleSection from "./ToggleSection.vue";

export default { title: "ToggleSection" };

export const Default: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    setup() {
      return {};
    },
    template: `
      <ToggleSection label="Section">Content Content Content</ToggleSection>`,
  });

export const OpenedByDefault: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    setup() {
      return {};
    },
    template: `
          <ToggleSection label="Section" :opened-by-default="true">Content Content Content</ToggleSection>`,
  });
