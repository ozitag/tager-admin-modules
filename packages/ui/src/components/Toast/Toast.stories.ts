import { defineComponent } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import {
  type ShowToastOptions,
  type ToastParams,
  useToast,
} from "@tager/admin-services";

import BaseButton from "../BaseButton/BaseButton.vue";

import Toast from "./Toast.vue";
import ToastList from "./ToastList.vue";

export default { title: "Toast" };

const VARIANT_ARG_TYPE = {
  control: "select" as const,
  options: ["primary", "secondary", "success", "info", "warning", "danger"],
};

export const Playground: StoryObj<ToastParams> = {
  render: (args) =>
    defineComponent({
      components: { Toast },
      setup() {
        const toast: ToastParams = {
          variant: args.variant,
          title: args.title,
          body: args.body,
        };

        return {
          toast,
        };
      },
      template: `
        <Toast :toast="toast"/>
      `,
    }),

  argTypes: {
    variant: VARIANT_ARG_TYPE,
  },

  args: {
    variant: "primary",
    title: "Toast title",
    body: "Toast body",
  },
};

export const Toaster: StoryObj<ToastParams & ShowToastOptions> = {
  render: (args) =>
    defineComponent({
      components: { ToastList, BaseButton },
      setup() {
        const toast = useToast();

        function showNewToast() {
          toast.show({
            variant: args.variant,
            title: args.title,
            body: args.body,
          });
        }

        return {
          showNewToast,
        };
      },
      template: `
        <div>
          <ToastList />
          <BaseButton @click="showNewToast">Add new toast</BaseButton>
        </div>
      `,
    }),

  argTypes: {
    variant: VARIANT_ARG_TYPE,
  },

  args: {
    variant: "primary",
    title: "Toast title",
    body: "Toast body",
    timeout: 3000,
  },
};
