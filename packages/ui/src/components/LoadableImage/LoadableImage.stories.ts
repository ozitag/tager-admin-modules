import { defineComponent } from "vue";

import LoadableImage from "./LoadableImage.vue";

export default { title: "LoadableImage" };

export const Default = () =>
  defineComponent({
    components: { LoadableImage },
    template: `
      <div style="width: 300px; height: 300px;position: relative">
        <LoadableImage src="https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg"/>
      </div>
    `,
  });
