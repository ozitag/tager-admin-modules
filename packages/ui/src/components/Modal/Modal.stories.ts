import { defineComponent, ref } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import { BaseButton } from "../BaseButton";

import Modal from "./Modal.vue";

export default { title: "Modal" };

export const Playground: StoryObj = {
  render: (args) =>
    defineComponent({
      name: "DefaultModal",
      components: { Modal, BaseButton },
      setup() {
        const isOpen = ref<boolean>(false);

        return { args, isOpen };
      },
      template: `
        <div>
          <BaseButton variant="primary" @click="isOpen = true">
            Open modal
          </BaseButton>

          <Modal v-model:open="isOpen" v-bind="args">
            <p>
              Содержимое окна. Esc, крестик и клик мимо окна закрывают его,
              Tab ходит по кругу внутри, фокус возвращается на кнопку.
            </p>

            <template #footer>
              <BaseButton variant="outline-secondary" @click="isOpen = false">
                Cancel
              </BaseButton>
              <BaseButton variant="primary" @click="isOpen = false">
                Save
              </BaseButton>
            </template>
          </Modal>
        </div>
      `,
    }),

  args: {
    title: "Modal title",
    subtitle: "Supporting line under the title",
    width: "600px",
    closable: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
  },
};

/** Длинное содержимое: окно выше экрана прокручивается вместе с подложкой. */
export const Scrolling: StoryObj = {
  render: () =>
    defineComponent({
      name: "ScrollingModal",
      components: { Modal, BaseButton },
      setup() {
        const isOpen = ref<boolean>(true);
        const paragraphs = Array.from({ length: 30 }, (_, index) => index + 1);

        return { isOpen, paragraphs };
      },
      template: `
        <div>
          <BaseButton variant="primary" @click="isOpen = true">
            Open modal
          </BaseButton>

          <Modal v-model:open="isOpen" title="Long content" width="40rem">
            <p v-for="number in paragraphs" :key="number">
              Paragraph {{ number }}
            </p>
          </Modal>
        </div>
      `,
    }),
};
