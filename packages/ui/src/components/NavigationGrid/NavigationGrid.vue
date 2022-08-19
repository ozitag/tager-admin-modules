<template>
  <div class="nav-container">
    <div
      v-for="(navItem, index) of navItems"
      :key="index"
      class="nav-card"
      :style="`width: ${getWidth(navItem)}`"
    >
      <GridItemWrapper :url="navItem.url">
        <div
          :class="['top', { 'full-height': hasNameOnly(navItem) }]"
          data-ui-navigation-grid-item-top
        >
          <span class="name">{{ navItem.name }}</span>
        </div>
        <div v-if="hasContent(navItem)" class="content">
          <div v-if="Boolean(navItem.total)" class="total-block">
            <spinner
              v-if="navItem.total.status === 'LOADING'"
              :size="40"
              :stroke-width="3"
              class="spinner"
            />
            <component
              :is="navItem.total.url ? 'router-link' : 'span'"
              v-else
              class="total-value"
              :to="navItem.total.url || undefined"
            >
              {{ formatNumber(navItem.total.value) }}
            </component>
          </div>

          <ul
            v-if="navItem.linkList && navItem.linkList.length > 0"
            :class="['link-list', { center: navItem.linkList.length === 1 }]"
          >
            <li v-for="(link, linkIndex) of navItem.linkList" :key="linkIndex">
              <router-link :to="link.url">
                {{ link.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </GridItemWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import Spinner from "../BaseSpinner";

import {
  formatNumber,
  getWidth,
  hasContent,
  hasNameOnly,
} from "./NavigationGrid.helpers";
import type { NavigationGridItem } from "./NavigationGrid.types";
import GridItemWrapper from "./components/GridItemWrapper.vue";

interface Props {
  navItems: Array<NavigationGridItem>;
}

export default defineComponent({
  name: "NavigationGrid",
  components: { Spinner, GridItemWrapper },
  props: {
    navItems: {
      type: Array,
      default: () => [] as PropType<Array<NavigationGridItem>>,
    },
  },
  setup() {
    return {
      hasContent,
      hasNameOnly,
      formatNumber,
      getWidth,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-container {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
}

.nav-card {
  padding: 0.5rem;
  min-height: 150px;
}

.content {
  padding: 1rem;
}

.top {
  position: relative;
  display: block;
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
  transition: border-color 100ms linear;

  &.full-height {
    border: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.name {
}

.total-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;

  a {
    &:hover {
      opacity: 0.75;
    }
  }
}

.total-value {
  font-size: 2.3rem;
  font-weight: 500;
}

.link-list {
  margin-top: 0.5rem;

  &.center {
    text-align: center;
  }

  a {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
