import Badge from "./Badge.vue";

export default { title: "Badge" };

export const Default = () => ({
  components: { Badge },
  template: "<Badge>Hello</Badge>",
});

export const Color = () => ({
  components: { Badge },
  template: '<Badge color="red" text-color="black">Hello</Badge>',
});

export const Size = () => ({
  components: { Badge },
  template: '<Badge :size="20">Hello</Badge>',
});

export const Empty = () => ({
  components: { Badge },
  template: "<Badge/>",
});
