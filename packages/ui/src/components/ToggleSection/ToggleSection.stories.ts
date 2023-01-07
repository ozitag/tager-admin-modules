import { defineComponent, ref } from "vue";
import type { StoryFn } from "@storybook/vue3";

import BaseCheckbox from "../BaseCheckbox";

import ToggleSection from "./ToggleSection.vue";

export default { title: "ToggleSection" };

export const Default: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    template: `
      <ToggleSection label="Section">Content Content Content</ToggleSection>`,
  });

export const Multiple: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    template: `
      <div>
      <ToggleSection label="Section">Content Content Content</ToggleSection>
      <ToggleSection label="Section">Content Content Content</ToggleSection>
      <ToggleSection label="Section">Content Content Content</ToggleSection>
      <ToggleSection label="Section">Content Content Content</ToggleSection>
      </div>
    `,
  });

export const OpenedByDefault: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    template: `
      <ToggleSection label="Section" :isOpen="true">Content Content Content</ToggleSection>`,
  });

export const ToggleByChangeEvent: StoryFn = () =>
  defineComponent({
    components: { ToggleSection },
    setup() {
      const isOpen = ref<boolean>(false);

      const toggle = (value: boolean) => (isOpen.value = value);

      return {
        isOpen,
        toggle,
      };
    },
    template: `
      <ToggleSection label="Section" :isOpen="isOpen" @toggle="isOpen">Content Content Content</ToggleSection>`,
  });

export const ToggleByVModel: StoryFn = () =>
  defineComponent({
    components: { ToggleSection, BaseCheckbox },
    setup() {
      const isOpen = ref<boolean>(false);

      return {
        isOpen,
      };
    },
    template: `
      <div>
      <BaseCheckbox v-model:checked="isOpen"/><br/>
      <ToggleSection label="Section" v-model:isOpen="isOpen">Content Content Content</ToggleSection>
      </div>`,
  });
