import { FETCH_STATUSES } from "@tager/admin-services";

import NavigationGrid from "./NavigationGrid.vue";
import type { NavigationGridItem } from "./NavigationGrid.types";

export default { title: "NavigationGrid" };

const navItemList: Array<NavigationGridItem> = [
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.SUCCESS, value: 5, url: "/presets" },
    linkList: [
      { url: "/presets", text: "Preset list" },
      { url: "/presets/create", text: "Create preset" },
    ],
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.LOADING, value: 212321 },
    linkList: [{ url: "/presets", text: "Preset list" }],
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.SUCCESS, value: 3712312 },
    linkList: [{ url: "/presets", text: "Preset list" }],
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.SUCCESS, value: 28123 },
    linkList: [
      { url: "/presets", text: "Preset list" },
      { url: "/presets/create", text: "Create preset" },
    ],
  },
  {
    name: "Presets",
    url: "/presets",
    // total: { status: FETCH_STATUSES.SUCCESS, value: 0 },
    // linkList: [{ url: '/presets', text: 'Preset list' }],
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.LOADING, value: 11523 },
    // linkList: [{ url: '/presets', text: 'Preset list' }],
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.IDLE, value: 1 },
    width: 25,
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.LOADING, value: 2 },
    width: 25,
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.SUCCESS, value: 3 },
    width: 25,
  },
  {
    name: "Presets",
    total: { status: FETCH_STATUSES.FAILURE, value: 4 },
    width: 25,
  },
];

export const Default = () => ({
  components: { NavigationGrid },
  setup() {
    return {
      navItemList,
    };
  },
  template: `
      <div style="padding: 2rem; background-color: #f3f3f3">
        <NavigationGrid :nav-items="navItemList" />
      </div>
    `,
});
