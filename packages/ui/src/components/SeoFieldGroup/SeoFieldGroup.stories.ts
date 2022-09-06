import { defineComponent, ref } from "vue";

import { createId } from "@tager/admin-services";

import type {
  SeoChangeEvent,
  SingleFileInputValueType,
} from "../../typings/common";

import SeoFieldGroup from "./SeoFieldGroup.vue";

export default { title: "SeoFieldGroup" };

const TEST_FILE: SingleFileInputValueType = {
  id: createId(),
  file: {
    id: "174",
    mime: "image/jpeg",
    name: "e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg",
    size: 386793,
    url: "https://ozitag.com/logo.png",
  },
  caption: "Caption text",
};

interface ValuesState {
  pageTitle: string;
  pageDescription: string;
  h1: string;
  keywords: string;
  openGraphImage: SingleFileInputValueType | null;
}

export const Default = () =>
  defineComponent({
    name: "DefaultSeoFieldGroup",
    components: { SeoFieldGroup },
    setup() {
      const values = ref<ValuesState>({
        pageTitle: "Contact Us - Aerovolga",
        pageDescription:
          "Please provide a meta description by editing the snippet below. If you don’t, Google will try to find a relevant part of your post to show in the search results.",
        keywords: "keywords",
        h1: "default H1",
        openGraphImage: TEST_FILE,
      });

      function handleSearchEngineOptimization(_event: SeoChangeEvent) {
        // values.value.pageTitle = event.title;
        // values.value.pageDescription = event.description;
        // values.value.openGraphImage = event.image;
      }

      // or

      function handleSEOTitle(value: string) {
        values.value.pageTitle = value;
      }

      function handleSEODescription(value: string) {
        values.value.pageDescription = value;
      }

      function handleSEOH1(value: string) {
        values.value.h1 = value;
      }

      function handleSEOKeywords(value: string) {
        values.value.keywords = value;
      }

      function handleSEOImage(value: SingleFileInputValueType | null) {
        values.value.openGraphImage = value;
      }

      return {
        values,
        handleSEOTitle,
        handleSEODescription,
        handleSEOKeywords,
        handleSEOH1,
        handleSEOImage,
        handleSearchEngineOptimization,
      };
    },
    template: `
          <SeoFieldGroup
              :title="values.pageTitle"
              @change:title="handleSEOTitle"

              :description="values.pageDescription"
              @change:description="handleSEODescription"

              :should-display-h1="true"
              :h1="values.h1"
              @change:h1="handleSEOH1"

              :should-display-keywords="true"
              :keywords="values.keywords"
              @change:keywords="handleSEOKeywords"

              :image="values.openGraphImage"
              @change:image="handleSEOImage"
              @change="handleSearchEngineOptimization"
          />
        `,
  });
