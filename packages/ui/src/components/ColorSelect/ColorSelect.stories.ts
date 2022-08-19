import { defineComponent, ref } from "vue";

import type { ColorOptionType } from "../../typings/common";

import ColorSelect from "./ColorSelect.vue";

export default { title: "ColorSelect" };

const OPTIONS: Array<ColorOptionType> = [
  { value: 1, label: "красный", color: "#ff0000" },
  { value: 2, label: "зеленый", color: "#008000" },
  { value: 3, label: "золотой", color: "#ffd700" },
  {
    value: 4,
    label: "голубое небо",
    imageUrl:
      "https://webgradients.com/public/webgradients_png/179%20Fabled%20Sunset.png",
  },

  { value: 5, label: "белый", color: "#ffffff" },
  { value: 6, label: "черный", color: "#000000" },
];

export const Default = () =>
  defineComponent({
    name: "DefaultColorSelect",
    components: { ColorSelect },
    setup() {
      const options = ref<Array<ColorOptionType>>(OPTIONS);
      const selected = ref<ColorOptionType | null>(null);

      return {
        options,
        selected,
      };
    },
    template: `<ColorSelect v-model:value="selected" :options="options" />`,
  });

export const Multiple = () =>
  defineComponent({
    name: "DefaultColorSelect",
    components: { ColorSelect },
    setup() {
      const options = ref<Array<ColorOptionType>>(OPTIONS);
      const selected = ref<Array<ColorOptionType> | null>([]);

      return {
        options,
        selected,
      };
    },
    template: `<ColorSelect v-model:value="selected" :options="options" :multiple="true" />`,
  });
