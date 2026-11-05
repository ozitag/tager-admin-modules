import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import DeleteIcon from "../../icons/DeleteIcon.vue";
import EditIcon from "../../icons/EditIcon.vue";

import BaseButton from "./BaseButton.vue";

export default { title: "BaseButton" };

const variantArgType = {
  control: "select" as const,
  options: [
    "primary",
    "primary-link",
    "outline-primary",
    "secondary",
    "secondary-link",
    "outline-secondary",
    "red",
    "red-link",
    "red-outline",
    "green",
    "green-link",
    "green-outline",
    "icon",
  ],
};

export const Default: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton/>`,
    }),
};

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseButton },
      setup() {
        return { args };
      },
      template: `
        <BaseButton v-bind="args"/>`,
    }),

  argTypes: {
    variant: variantArgType,
  },

  args: {
    variant: "primary",
    disabled: false,
    loading: false,
    href: "",
  },
};

export const Primary: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="primary"/>
    `,
    }),
};

export const PrimaryOutline: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="outline-primary"/>
    `,
    }),
};

export const Secondary: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="secondary"/>
    `,
    }),
};

export const SecondaryOutline: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="outline-secondary"/>
    `,
    }),
};

export const PrimaryLoading: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="primary" loading></BaseButton>
    `,
    }),
};

export const PrimaryOutlineLoading: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton },
      template: `
      <BaseButton variant="outline-primary" loading></BaseButton>
    `,
    }),
};

export const Icon: StoryObj = {
  render: () =>
    defineComponent({
      components: { BaseButton, EditIcon, DeleteIcon },
      template: `
      <div>
      <BaseButton variant="icon">
        <EditIcon/>
      </BaseButton>
      <BaseButton variant="icon" disabled>
        <DeleteIcon/>
      </BaseButton>
      </div>`,
    }),
};

export const Link: StoryObj = {
  render: (args) =>
    defineComponent({
      components: { BaseButton },
      setup() {
        return { args };
      },
      template: `
        <BaseButton variant="primary" target="_blank" v-bind="args">Go</BaseButton>
      `,
    }),

  args: {
    href: "https://ozitag.com",
  },
};
