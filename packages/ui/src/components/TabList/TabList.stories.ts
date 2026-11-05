import { ref } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import TabList from "./TabList.vue";
import type { TabType } from "./TabList.types";

export default {
  title: "TabList",
};

const TAB_LIST: Array<TabType> = [
  {
    id: "common",
    label: "Common",
  },
  {
    id: "images",
    label: "Images",
  },
  {
    id: "relations",
    label: "Relations",
  },
  {
    id: "seo",
    label: "SEO",
  },
];

export const Default: StoryObj = {
  render: () => ({
    name: "TabListDefault",
    components: { TabList },
    setup() {
      const selectedTabId = ref(TAB_LIST[0]?.id ?? null);
      return {
        selectedTabId,
        tabList: TAB_LIST,
      };
    },
    template: `
    <TabList 
        :tab-list="tabList"
        v-model:tab-id="selectedTabId"
    />
  `,
  }),
};

export const Playground: StoryObj = {
  render: (args) => ({
    name: "TabListDefault",
    components: { TabList },
    setup() {
      const selectedTabId = ref(TAB_LIST[0]?.id ?? null);
      return {
        selectedTabId,
        tabList: TAB_LIST,
        args,
      };
    },
    template: `
      <TabList
        :tab-list="tabList"
        v-model:tab-id="selectedTabId"
        v-bind="args"
      />
    `,
  }),

  args: {
    alignedRight: false,
    bordered: false,
  },
};

export const LargeWidth: StoryObj = {
  render: (args) => ({
    name: "TabListLargeWidth",
    components: { TabList },
    setup() {
      const selectedTabId = ref(TAB_LIST[0]?.id ?? null);
      return {
        selectedTabId,
        tabList: [
          ...TAB_LIST,
          ...TAB_LIST,
          ...TAB_LIST,
          ...TAB_LIST,
          ...TAB_LIST,
        ],
        args,
      };
    },
    template: `
      <TabList 
          :tab-list="tabList"
          v-model:tab-id="selectedTabId"
          v-bind="args"
      />
    `,
  }),
};

export const WithErrors: StoryObj = {
  render: () => ({
    name: "TabList_WithErrors",
    components: { TabList },
    setup() {
      const customTabList: Array<TabType> = [
        ...TAB_LIST,
        {
          id: "settings",
          label: "Settings",
          hasErrors: true,
        },
      ];
      const selectedTabId = ref(customTabList[0]?.id ?? null);

      return {
        selectedTabId,
        tabList: customTabList,
      };
    },
    template: `
    <TabList 
        :tab-list="tabList"
        v-model:tab-id="selectedTabId"
    />
  `,
  }),
};
