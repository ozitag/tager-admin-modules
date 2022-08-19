import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import { type ToastParams, useToast } from "@tager/admin-services";

import BaseButton from "../BaseButton/BaseButton.vue";

import Toast from "./Toast.vue";
import ToastList from "./ToastList.vue";

export default { title: "Toast" };

const VARIANT_ARG_TYPE = {
  control: "select",
  options: ["primary", "secondary", "success", "info", "warning", "danger"],
};

export const Playground: StoryFn = (args) =>
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
  });

Playground.argTypes = {
  variant: VARIANT_ARG_TYPE,
};

Playground.args = {
  variant: "primary",
  title: "Toast title",
  body: "Toast body",
};

export const Toaster: StoryFn = (args) =>
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
  });

Toaster.argTypes = {
  variant: VARIANT_ARG_TYPE,
};

Toaster.args = {
  variant: "primary",
  title: "Toast title",
  body: "Toast body",
  timeout: 3000,
};
