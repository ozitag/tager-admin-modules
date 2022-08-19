import { ref } from "vue";
import { StoryFn } from "@storybook/vue3";

import TabList, { TabType } from "./TabList.vue";

export default {
  title: "TabList",
  decorators: [
    () => ({ template: '<div style="margin: 1rem;"><story/></div>' }),
  ],
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

export const Default = () => ({
  name: "TabListDefault",
  components: { TabList },
  setup() {
    const selectedTabId = ref(TAB_LIST[0].id);
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
});

export const Playground: StoryFn = (args) => ({
  name: "TabListDefault",
  components: { TabList },
  setup() {
    const selectedTabId = ref(TAB_LIST[0].id);
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
});

Playground.args = {
  alignedRight: false,
  bordered: false,
};

export const WithErrors = () => ({
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
    const selectedTabId = ref(customTabList[0].id);

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
});
