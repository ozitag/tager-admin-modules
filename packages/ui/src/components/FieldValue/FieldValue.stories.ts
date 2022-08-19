import FieldValue from "./FieldValue.vue";

export default { title: "FieldValue" };

export const Text = () => ({
  name: "TextFieldValue",
  components: { FieldValue },
  setup() {
    const text = "It's not exactly a real DOM element.";

    return {
      text,
    };
  },
  template: `<FieldValue label="Label" type="text" :text="text" />`,
});

export const Link = () => ({
  name: "LinkFieldValue",
  components: { FieldValue },
  setup() {
    const src = "https://belmebel.dev.ozitag.com/";
    const text = "https://belmebel.by";

    return {
      src,
      text,
    };
  },
  template: `<FieldValue label="Label" type="link" :src="src" :text="text" />`,
});

export const VideoYouTube = () => ({
  name: "VideoFieldValue",
  components: { FieldValue },
  setup() {
    const videoId = "4JS70KB9GS0";

    return {
      videoId,
    };
  },
  template: `<FieldValue label="Label" type="video" :videoId="videoId" />`,
});
export const VideoMP4 = () => ({
  name: "VideoFieldValue",
  components: { FieldValue },
  setup() {
    const src =
      "https://sachinchoolur.github.io/lightgallery.js/static/videos/video1.mp4";

    return {
      src,
    };
  },
  template: `<FieldValue label="Label" type="video" :src="src" />`,
});

export const Image = () => ({
  name: "ImageFieldValue",
  components: { FieldValue },
  setup() {
    const src =
      "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg";

    return {
      src,
    };
  },
  template: `<FieldValue label="Label" type="image" :src="src" />`,
});

export const List = () => ({
  name: "ListFieldValue",
  components: { FieldValue },
  setup() {
    const items = [
      { title: "Картофель" },
      { title: "Морковь" },
      { title: "Лук" },
      { title: "Чеснок" },
      { title: "Петрушка" },
      { title: "Укроп" },
    ];

    return {
      items,
    };
  },
  template: `<FieldValue label="Список продуктов на неделю" type="list" :items="items" />`,
});
