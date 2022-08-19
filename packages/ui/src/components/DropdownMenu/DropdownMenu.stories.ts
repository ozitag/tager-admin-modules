import { defineComponent, ref } from "vue";

import type { DropdownMenuItemType } from "../../typings/common";

import DropdownMenu from "./DropdownMenu.vue";

export default { title: "DropdownMenu" };

export const Default = () =>
  defineComponent({
    components: { DropdownMenu },
    setup() {
      function sayCow() {
        alert("coow");
      }

      const options = ref<Array<DropdownMenuItemType>>([
        {
          type: "link",
          text: "Change profile",
          url: "/self/profile/update",
          onClick: sayCow,
        },
        {
          type: "link",
          text: "Change password",
          url: "/self/password/update",
        },
        { type: "divider" },
        { type: "button", text: "Logout", onClick: sayCow },
      ]);

      return {
        options,
      };
    },
    template: `
      <div style="position: relative; padding: 1rem">
        <DropdownMenu :options="options" style="top: 0; display: block"/>
      </div>
  `,
  });
