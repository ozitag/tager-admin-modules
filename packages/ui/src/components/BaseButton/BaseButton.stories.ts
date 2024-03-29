import { defineComponent } from "vue";
import type { Story } from "@storybook/vue3";

import DeleteIcon from "../../icons/DeleteIcon.vue";
import EditIcon from "../../icons/EditIcon.vue";

import BaseButton from "./BaseButton.vue";

export default { title: "BaseButton" };

const variantArgType = {
  control: "select",
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

export const Default = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton/>`,
  });

export const Playground: Story = (args) =>
  defineComponent({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton v-bind="args"/>`,
  });

Playground.argTypes = {
  variant: variantArgType,
};

Playground.args = {
  variant: "primary",
  disabled: false,
  loading: false,
  href: "",
};

export const Primary = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="primary"/>
    `,
  });

export const PrimaryOutline = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="outline-primary"/>
    `,
  });

export const Secondary = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="secondary"/>
    `,
  });

export const SecondaryOutline = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="outline-secondary"/>
    `,
  });

export const PrimaryLoading = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="primary" loading></BaseButton>
    `,
  });

export const PrimaryOutlineLoading = () =>
  defineComponent({
    components: { BaseButton },
    template: `
      <BaseButton variant="outline-primary" loading></BaseButton>
    `,
  });

export const Icon = () =>
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
  });

export const Link: Story = (args) =>
  defineComponent({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton variant="primary" target="_blank" v-bind="args">Go</BaseButton>
    `,
  });

Link.args = {
  href: "https://ozitag.com",
};
