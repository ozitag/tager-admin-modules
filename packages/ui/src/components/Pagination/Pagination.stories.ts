import { defineComponent } from "vue";
import { StoryFn } from "@storybook/vue3";

import Pagination from "./Pagination.vue";

export default { title: "Pagination" };

export const Playground: StoryFn = (args) =>
  defineComponent({
    components: { Pagination },
    setup() {
      return { args };
    },
    template: `<Pagination v-bind="args" />`,
  });

Playground.args = {
  pageCount: 2,
  pageNumber: 1,
  pageSize: 10,
  pageSizes: [10, 30, 50, 100],
  usePageSize: true,
  disabled: false,
  pageItemCount: 9,
};
