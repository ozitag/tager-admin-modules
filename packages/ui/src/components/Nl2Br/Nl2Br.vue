<script lang="ts">
import { defineComponent, h } from "vue";
import type { VNode } from "vue";

export default defineComponent({
  name: "Nl2Br",
  props: {
    tag: { type: String, required: false, default: "p" },
    text: { type: String, required: true },
    class: { type: String, required: false, default: "" },
  },
  setup(props) {
    return () =>
      h(
        props.tag,
        {
          class: props.class,
        },
        props.text
          .split("\n")
          .reduce((accumulator: Array<string | VNode>, string: string) => {
            if (!Array.isArray(accumulator) || accumulator.length === 0) {
              return [string];
            }
            return accumulator.concat([h("br"), string]);
          }, [])
      );
  },
});
</script>
