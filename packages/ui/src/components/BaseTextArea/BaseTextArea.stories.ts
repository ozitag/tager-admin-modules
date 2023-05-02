import { ref } from "vue";
import type { Story } from "@storybook/vue3";

import BaseTextArea from "./BaseTextArea.vue";

export default { title: "BaseTextArea" };

export const Default = () => ({
  components: { BaseTextArea },
  setup() {
    const value = ref("");

    return { value };
  },
  template: `<BaseTextArea v-model:value="value" />`,
});

export const BigValue = () => ({
  components: { BaseTextArea },
  setup() {
    const value = ref(
      "User-Agent: *\n" +
        "\n" +
        "Disallow: /vw/id4-x\n" +
        "Disallow: /vw/id4-crozz\n" +
        "Disallow: /vw/id6-x\n" +
        "Disallow: /vw/id6-crozz\n" +
        "Disallow: /byd/han\n" +
        "Disallow: /byd/tang\n" +
        "Disallow: /eko\n" +
        "Disallow: /atlantm\n" +
        "\n" +
        "Disallow: */index.php\n" +
        "Disallow: /bitrix/\n" +
        "Disallow: /tradein/\n" +
        "Disallow: /lkk/\n" +
        "Disallow: /lkk/favorite/\n" +
        "Disallow: /lkk/orders/\n" +
        "Disallow: /order/\n" +
        "Disallow: *?ORDER_ID=\n" +
        "Disallow: /*show_include_exec_time=\n" +
        "Disallow: /*show_page_exec_time=\n" +
        "Disallow: /*show_sql_stat=\n" +
        "Disallow: /*bitrix_include_areas=\n" +
        "Disallow: /*clear_cache=\n" +
        "Disallow: /*clear_cache_session=\n" +
        "Disallow: /*ADD_TO_COMPARE_LIST\n" +
        "Disallow: /*?print=\n" +
        "Disallow: /*auth=\n" +
        "Disallow: /*backurl=\n" +
        "Disallow: /*BACKURL=\n" +
        "Disallow: /*BACK_URL=\n" +
        "Disallow: *?VIEW=\n" +
        "Disallow: *?SECTION_CODE=\n" +
        "Disallow: *?logout=yes\n" +
        "Disallow: *?search=\n" +
        "Disallow: *?ELEMENT_CODE=\n" +
        "Disallow: *?TEMPLATE_CODE=\n" +
        "Disallow: /lk/\n" +
        "Disallow: /bitrix/js/\n" +
        "Disallow: /hr/\n" +
        "Disallow: /offers?tag=*\n" +
        "Disallow: /reviews?tag=*\n" +
        "Disallow: /news?tag=*\n" +
        "Disallow: /*page=0\n" +
        "Allow: *.svg\n" +
        "\n" +
        "Disallow: /*?roistat*\n" +
        "Disallow: /*?rb_clickid*\n" +
        "Disallow: /*?rs=*\n" +
        "Disallow: /*?label=*\n" +
        "Disallow: /*?_ga=*\n" +
        "Disallow: /*?HASH=*\n" +
        "Disallow: /*?sap-outbound-id=*\n" +
        "Disallow: /*?ad_tub=*\n" +
        "Disallow: /*?FILTER=*\n" +
        "Disallow: /*?view=*\n" +
        "Disallow: /*?VIN=*\n" +
        "Disallow: /*?back_url_admin=*\n" +
        "Disallow: /*?bxajaxid=*\n" +
        "Disallow: *state*pages*offset*\n" +
        "Disallow: *?sort*\n" +
        "Disallow: *?sort=*&page*\n" +
        "Disallow: *?sortby*\n" +
        "Disallow: *?cur_cc=*\n" +
        "Disallow: *?adv=*\n" +
        "Disallow: /helper/tag-*-*\n" +
        "Disallow: *?BRAND\n" +
        "Disallow: *?MODEL\n" +
        "Disallow: *?MODE\n" +
        "Disallow: *?FUEL\n" +
        "Allow: /.well-known/\n" +
        "Disallow: *?ref=*\n" +
        "Disallow: *?d=*\n" +
        "Disallow: *?etext=*\n" +
        "Disallow: *?dir=*\n" +
        "Disallow: *?element_id=*\n" +
        "Disallow: *?idd=*\n" +
        "Disallow: *?state=*\n" +
        "Disallow: *?mode=leasing*\n" +
        "Disallow: *?mode=credit*\n" +
        "Disallow: *?hhtmfrom=employer*\n" +
        "Disallow: *?type=iframe*\n" +
        "Disallow: *?tag=*\n" +
        "Disallow: *?full=*\n" +
        "Disallow: *?brand=*\n" +
        "Disallow: *?ad=*\n" +
        "Disallow: *?gb=*\n" +
        "Disallow: *?gbraid=*\n" +
        "Disallow: *?wbraid=*\n" +
        "\n" +
        "Clean-param: utm_source&utm_medium&utm_content&utm_term&utm_campaign&yclid\n" +
        "Clean-param: offset&limit&from&yhid&yandex_ad_client_id&yandex_ad_order_id\n" +
        "Sitemap: https://atlantm.by/sitemap.xml"
    );

    return { value };
  },
  template: `<BaseTextArea v-model:value="value"  :max-height-rows="10" />`,
});

export const Playground: Story = (args) => ({
  components: { BaseTextArea },
  setup() {
    const value = ref("");

    return { value, args };
  },
  template: `<BaseTextArea v-model:value="value" v-bind="args"/>`,
});

Playground.args = {
  disabled: false,
  placeholder: "Enter some text...",
  readonly: false,
  rows: 3,
  autosize: false,
};
