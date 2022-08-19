<template>
  <div class="browser">
    <div class="header">
      <div class="dots">
        <span class="dot" style="background: #ed594a"></span>
        <span class="dot" style="background: #fdd800"></span>
        <span class="dot" style="background: #5ac05a"></span>
      </div>

      <div>
        <input type="text" value="https://gmail.com" />
      </div>

      <div class="bars">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BrowserWindow",
});
</script>

<style scoped lang="scss">
.browser {
  display: grid;
  grid-template-rows: auto 1fr;

  overflow: hidden;
  padding: 3px;
  border-radius: 4px;
  background-color: #f1f1f1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 7px 10px 10px 10px;
}

.body {
  background-color: #fff;
  border-radius: 0 0 2px 2px;
}

.dots {
  display: flex;
  align-items: center;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #bbb;

  &:not(:last-child) {
    margin-right: 4px;
  }
}

input[type="text"] {
  width: 100%;
  border-radius: 3px;
  border: none;
  background-color: white;
  margin-top: -8px;
  height: 25px;
  color: #666;
  padding: 5px;
}

.bar {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}
</style>
