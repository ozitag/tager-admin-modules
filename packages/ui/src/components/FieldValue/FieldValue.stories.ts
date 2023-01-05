import { ref } from "vue";

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
  template: `
    <FieldValue label="Label" type="text" :value="text"/>`,
});

export const TextWithEdit = () => ({
  name: "TextFieldValue",
  components: { FieldValue },
  setup() {
    const editMode = ref<boolean>(false);

    const onEditClick = () => {
      editMode.value = true;
    };

    const onCancelClick = () => {
      editMode.value = false;
    };

    return {
      editMode,
      onEditClick,
      onCancelClick,
    };
  },
  template: `
    <FieldValue label="Label" type="text" value="It's not exactly a real DOM element."
                :with-edit="true" :edit-active="editMode" edit-label="Edit Item"
                @edit="onEditClick">
    <template #edit>
      Edit Form...<br/>
      Edit Form...<br/>
      Edit Form...<br/>
      <button @click="onCancelClick">Cancel</button>
    </template>
    </FieldValue>`,
});

export const TextMultiLine = () => ({
  name: "TextMultiLine",
  components: { FieldValue },
  setup() {
    const text = "Line1\nLine 2\nLine 3\nLine 4";

    return {
      text,
    };
  },
  template: `
    <FieldValue label="Label" type="text" :value="text"/>`,
});

export const Date = () => ({
  name: "DateFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Label" type="date" value="2022-12-21T23:20:35+00:00"/>`,
});

export const DateTime = () => ({
  name: "DateTimeFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Label" type="datetime" value="2022-12-21T23:20:35+00:00"/>`,
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
  template: `
    <FieldValue label="Label" type="link" :src="src" :value="text"/>`,
});

export const Json = () => ({
  name: "JsonFieldValue",
  components: { FieldValue },
  setup() {
    return {
      text: '{"identifier":"132431","attributes":{"id":132431,"age_ratings":[41588,54620],"artworks":[15284],"category":0,"cover":{"id":192090,"alpha_channel":false,"animated":false,"game":132431,"height":800,"image_id":"co447u","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/co447u.jpg","width":600,"checksum":"d404a494-f176-7ce4-f593-62234722d501"},"created_at":"2020-04-21T11:38:07.000000Z","external_games":[1860057,1974518],"first_release_date":"2021-02-23T00:00:00.000000Z","genres":[{"id":8,"created_at":1297555200,"name":"Platform","slug":"platform","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/genres\\/platform","checksum":"697fc5a4-b96f-a803-288a-498bd5dd1de1"},{"id":9,"created_at":1297555200,"name":"Puzzle","slug":"puzzle","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/genres\\/puzzle","checksum":"616de9c3-8a00-0232-9df9-00014cfac51b"},{"id":31,"created_at":1323561600,"name":"Adventure","slug":"adventure","updated_at":1323561600,"url":"https:\\/\\/www.igdb.com\\/genres\\/adventure","checksum":"a6d85192-8d11-bad3-cc5c-dd89e2f94a47"},{"id":32,"created_at":1341360000,"name":"Indie","slug":"indie","updated_at":1341360000,"url":"https:\\/\\/www.igdb.com\\/genres\\/indie","checksum":"2522259f-2454-ec02-5dc0-84373e0508ed"},{"id":33,"created_at":1380931200,"name":"Arcade","slug":"arcade","updated_at":1380931200,"url":"https:\\/\\/www.igdb.com\\/genres\\/arcade","checksum":"388cec36-d099-f4a1-31c3-f938fae9067b"}],"involved_companies":[123411,130040],"name":"iota.","platforms":[39,130],"release_dates":[251258,341036],"screenshots":[{"id":440748,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g30","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g30.jpg","width":1280,"checksum":"19c4ff22-ddf2-3195-022c-a7237ac3cd63"},{"id":440749,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g31","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g31.jpg","width":1280,"checksum":"aa761763-5bea-d242-07bd-cb744a6c5b25"},{"id":440750,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g32","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g32.jpg","width":1280,"checksum":"d973d0dc-3f20-3586-5e39-31cab3233d89"},{"id":440751,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g33","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g33.jpg","width":1280,"checksum":"996ec510-ab5d-992c-1d60-ca251eef4011"},{"id":440752,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g34","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g34.jpg","width":1280,"checksum":"19235dbf-76d5-5a23-8b7c-3a9501456056"}],"similar_games":[20342,25646,28070,55190,81680,89597,106992,110503,111130,117311],"slug":"iota","summary":"iota is the first hardcore platformer designed with the touch screen in mind! There is no jump button. You will bounce from the floor to the ceiling as you make your way left, right, up, and down as you dodge saws and avoid spikes to make it to the next level.\\n\\niota features 36 handcrafted levels which provide over 5 hours of content!\\n\\niota is for people who are bored with casual games and are ready for a real challenge! Experience console level difficulty on your iPhone and iPad!","tags":[1,268435464,268435465,268435487,268435488,268435489],"themes":[{"id":1,"created_at":1322524800,"name":"Action","slug":"action","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/themes\\/action","checksum":"c177e0ff-f29a-2a2e-fce5-f945258ceb59"}],"updated_at":"2022-02-03T00:18:55.000000Z","url":"https:\\/\\/www.igdb.com\\/games\\/iota","websites":[{"id":175967,"category":10,"game":132431,"trusted":true,"url":"https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707","checksum":"65cb0a14-80af-da36-3322-766ae9fd70e8"},{"id":175968,"category":11,"game":132431,"trusted":true,"url":"https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707","checksum":"0721050e-2777-c748-fad6-b4bc77769b66"},{"id":189644,"category":13,"game":132431,"trusted":true,"url":"https:\\/\\/store.steampowered.com\\/app\\/1273430","checksum":"ffdcbcd3-45d6-8609-6530-445ccbc03494"}],"checksum":"3be7df3f-80c4-7847-9234-9fc72e47ba88"},"relations":[]}',
    };
  },
  template: `
    <FieldValue label="JSON" type="json" :value="text"/>`,
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
  template: `
    <FieldValue label="Label" type="video" :videoId="videoId"/>`,
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
  template: `
    <FieldValue label="Label" type="video" :src="src"/>`,
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
  template: `
    <FieldValue label="Label" type="image" :src="src"/>`,
});

export const Gallery = () => ({
  name: "GalleryFieldValue",
  components: { FieldValue },
  setup() {
    const src =
      "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg";

    return {
      images: [src, src, src, src, src, src],
    };
  },
  template: `
    <FieldValue label="Label" type="gallery" :images="images"/>`,
});

export const List = () => ({
  name: "ListFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Список продуктов на неделю" :with-edit="true" type="list" :value="[
      'Картофель', 'Морковь', 'Лук',  'Чеснок', 'Петрушка', 'Укроп'
    ]"/>`,
});
