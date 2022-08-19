import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import BaseButton from "./BaseButton.vue";
import DeleteIcon from "../../icons/DeleteIcon.vue";
import EditIcon from "../../icons/EditIcon.vue";

export default { title: "BaseButton" };

const variantArgType = {
  control: "select",
  options: [
    "primary",
    "outline-primary",
    "secondary",
    "outline-secondary",
    "icon",
  ],
};

export const Default = () =>
  defineComponent({
    components: { BaseButton },
    template: `<BaseButton />`,
  });

export const Playground: StoryFn = (args) =>
  defineComponent({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `<BaseButton v-bind="args" />`,
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
    template: `<div>
      <BaseButton variant="icon">
          <EditIcon />
      </BaseButton>
      <BaseButton variant="icon" disabled>
          <DeleteIcon />
      </BaseButton>
  </div>`,
  });

export const Link: StoryFn = (args) =>
  defineComponent({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
        <BaseButton variant="primary" v-bind="args"></BaseButton>
    `,
  });

Link.args = {
  href: "https://ozitag.com",
};
