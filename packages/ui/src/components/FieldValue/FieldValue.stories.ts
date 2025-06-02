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
    <FieldValue label="Label" type="text" :value="text" />`,
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
        Edit Form...<br />
        Edit Form...<br />
        Edit Form...<br />
        <button @click="onCancelClick">Cancel</button>
      </template>
    </FieldValue>`,
});

export const TextWithEditHideValue = () => ({
  name: "TextWithEditHideValue",
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
                :with-edit="true" :edit-active="editMode" edit-label="Edit Item" :hide-value-on-edit="true"
                @edit="onEditClick">
      <template #edit>
        Edit Form...<br />
        Edit Form...<br />
        Edit Form...<br />
        <button @click="onCancelClick">Cancel</button>
      </template>
    </FieldValue>`,
});

export const TextWithEditActions = () => ({
  name: "TextWithEditActions",
  components: { FieldValue },
  setup() {
    const editMode = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const onEditClick = () => {
      editMode.value = true;
    };

    const onCancelClick = () => {
      editMode.value = false;
    };

    const onSaveClick = () => {
      loading.value = true;
      setTimeout(() => {
        editMode.value = false;
        loading.value = false;
      }, 2000);
    };

    return {
      loading,
      editMode,
      onEditClick,
      onSaveClick,
      onCancelClick,
    };
  },
  template: `
    <FieldValue label="Label" type="text" value="It's not exactly a real DOM element."
                :with-edit="true" :edit-active="editMode" edit-label="Edit Item"
                :with-edit-actions="true" :edit-actions-loading="loading"
                @edit="onEditClick" @cancel="onCancelClick" @save="onSaveClick">
      <template #edit>
        Edit Form...<br />
        Edit Form...<br />
        Edit Form...
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
    <FieldValue label="Label" type="text" :value="text" />`,
});

export const Date = () => ({
  name: "DateFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Label" type="date" value="2022-12-21T23:20:35+00:00" />`,
});

export const DateTime = () => ({
  name: "DateTimeFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Label" type="datetime" value="2022-12-21T23:20:35+00:00" />`,
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
    <FieldValue label="Label" type="link" :src="src" :value="text" />`,
});

export const JsonString = () => ({
  name: "JSON (String)",
  components: { FieldValue },
  setup() {
    return {
      text: '{"identifier":"132431","attributes":{"id":132431,"age_ratings":[41588,54620],"artworks":[15284],"category":0,"cover":{"id":192090,"alpha_channel":false,"animated":false,"game":132431,"height":800,"image_id":"co447u","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/co447u.jpg","width":600,"checksum":"d404a494-f176-7ce4-f593-62234722d501"},"created_at":"2020-04-21T11:38:07.000000Z","external_games":[1860057,1974518],"first_release_date":"2021-02-23T00:00:00.000000Z","genres":[{"id":8,"created_at":1297555200,"name":"Platform","slug":"platform","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/genres\\/platform","checksum":"697fc5a4-b96f-a803-288a-498bd5dd1de1"},{"id":9,"created_at":1297555200,"name":"Puzzle","slug":"puzzle","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/genres\\/puzzle","checksum":"616de9c3-8a00-0232-9df9-00014cfac51b"},{"id":31,"created_at":1323561600,"name":"Adventure","slug":"adventure","updated_at":1323561600,"url":"https:\\/\\/www.igdb.com\\/genres\\/adventure","checksum":"a6d85192-8d11-bad3-cc5c-dd89e2f94a47"},{"id":32,"created_at":1341360000,"name":"Indie","slug":"indie","updated_at":1341360000,"url":"https:\\/\\/www.igdb.com\\/genres\\/indie","checksum":"2522259f-2454-ec02-5dc0-84373e0508ed"},{"id":33,"created_at":1380931200,"name":"Arcade","slug":"arcade","updated_at":1380931200,"url":"https:\\/\\/www.igdb.com\\/genres\\/arcade","checksum":"388cec36-d099-f4a1-31c3-f938fae9067b"}],"involved_companies":[123411,130040],"name":"iota.","platforms":[39,130],"release_dates":[251258,341036],"screenshots":[{"id":440748,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g30","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g30.jpg","width":1280,"checksum":"19c4ff22-ddf2-3195-022c-a7237ac3cd63"},{"id":440749,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g31","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g31.jpg","width":1280,"checksum":"aa761763-5bea-d242-07bd-cb744a6c5b25"},{"id":440750,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g32","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g32.jpg","width":1280,"checksum":"d973d0dc-3f20-3586-5e39-31cab3233d89"},{"id":440751,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g33","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g33.jpg","width":1280,"checksum":"996ec510-ab5d-992c-1d60-ca251eef4011"},{"id":440752,"alpha_channel":false,"animated":false,"game":132431,"height":720,"image_id":"sc9g34","url":"\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g34.jpg","width":1280,"checksum":"19235dbf-76d5-5a23-8b7c-3a9501456056"}],"similar_games":[20342,25646,28070,55190,81680,89597,106992,110503,111130,117311],"slug":"iota","summary":"iota is the first hardcore platformer designed with the touch screen in mind! There is no jump button. You will bounce from the floor to the ceiling as you make your way left, right, up, and down as you dodge saws and avoid spikes to make it to the next level.\\n\\niota features 36 handcrafted levels which provide over 5 hours of content!\\n\\niota is for people who are bored with casual games and are ready for a real challenge! Experience console level difficulty on your iPhone and iPad!","tags":[1,268435464,268435465,268435487,268435488,268435489],"themes":[{"id":1,"created_at":1322524800,"name":"Action","slug":"action","updated_at":1323216000,"url":"https:\\/\\/www.igdb.com\\/themes\\/action","checksum":"c177e0ff-f29a-2a2e-fce5-f945258ceb59"}],"updated_at":"2022-02-03T00:18:55.000000Z","url":"https:\\/\\/www.igdb.com\\/games\\/iota","websites":[{"id":175967,"category":10,"game":132431,"trusted":true,"url":"https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707","checksum":"65cb0a14-80af-da36-3322-766ae9fd70e8"},{"id":175968,"category":11,"game":132431,"trusted":true,"url":"https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707","checksum":"0721050e-2777-c748-fad6-b4bc77769b66"},{"id":189644,"category":13,"game":132431,"trusted":true,"url":"https:\\/\\/store.steampowered.com\\/app\\/1273430","checksum":"ffdcbcd3-45d6-8609-6530-445ccbc03494"}],"checksum":"3be7df3f-80c4-7847-9234-9fc72e47ba88"},"relations":[]}',
    };
  },
  template: `
    <FieldValue label="JSON" type="json" y:value="text" />`,
});

const XML_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<manifest versionCode="0x3c5" versionName="5.0.21" compileSdkVersion="0x23" compileSdkVersionCodename="15" package="com.ton_keeper" platformBuildVersionCode="0x23" platformBuildVersionName="0xf">
  <uses-sdk minSdkVersion="0x18" targetSdkVersion="0x23">
  </uses-sdk>
  <queries>
    <package name="com.tonapps.signer">
    </package>
    <package name="org.telegram.messenger">
    </package>
    <intent>
      <action name="android.support.customtabs.action.CustomTabsService">
      </action>
    </intent>
    <intent>
      <action name="com.android.vending.billing.InAppBillingService.BIND">
      </action>
    </intent>
    <intent>
      <action name="com.google.android.apps.play.billingtestcompanion.BillingOverrideService.BIND">
      </action>
    </intent>
  </queries>
  <supports-screens anyDensity="0xffffffffffffffff" smallScreens="0xffffffffffffffff" normalScreens="0xffffffffffffffff" largeScreens="0xffffffffffffffff" resizeable="0xffffffffffffffff" xlargeScreens="0xffffffffffffffff">
  </supports-screens>
  <uses-feature glEsVersion="0x20000" required="0x0">
  </uses-feature>
  <uses-feature name="android.software.leanback" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.touchscreen" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.ram.low" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.camera.any" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.camera.autofocus" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.bluetooth" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.bluetooth_le" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.faketouch" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.microphone" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.wifi" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.telephony" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.screen.PORTRAIT" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.camera" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.camera2" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.sensor.proximity" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.nfc" required="0x0">
  </uses-feature>
  <uses-feature name="android.hardware.nfc.hce" required="0x0">
  </uses-feature>
  <uses-permission name="android.permission.INTERNET">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_NETWORK_STATE">
  </uses-permission>
  <uses-permission name="android.permission.POST_NOTIFICATIONS">
  </uses-permission>
  <uses-permission name="android.permission.CAMERA">
  </uses-permission>
  <uses-permission name="android.permission.VIBRATE">
  </uses-permission>
  <uses-permission name="android.permission.NFC">
  </uses-permission>
  <uses-permission name="com.android.launcher.permission.INSTALL_SHORTCUT">
  </uses-permission>
  <uses-permission name="com.android.launcher.permission.UNINSTALL_SHORTCUT">
  </uses-permission>
  <uses-permission name="android.permission.BLUETOOTH" maxSdkVersion="0x1e">
  </uses-permission>
  <uses-permission name="android.permission.BLUETOOTH_ADMIN" maxSdkVersion="0x1e">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_COARSE_LOCATION" maxSdkVersion="0x1c">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_FINE_LOCATION" maxSdkVersion="0x1e">
  </uses-permission>
  <uses-permission name="android.permission.BLUETOOTH_CONNECT">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_WIFI_STATE">
  </uses-permission>
  <uses-permission name="android.permission.RECORD_AUDIO">
  </uses-permission>
  <uses-permission name="android.permission.SYSTEM_ALERT_WINDOW">
  </uses-permission>
  <uses-permission name="android.permission.WRITE_EXTERNAL_STORAGE">
  </uses-permission>
  <uses-permission name="com.android.vending.BILLING">
  </uses-permission>
  <uses-permission name="android.permission.READ_EXTERNAL_STORAGE">
  </uses-permission>
  <uses-permission name="android.permission.FOREGROUND_SERVICE">
  </uses-permission>
  <uses-permission name="com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE">
  </uses-permission>
  <uses-permission name="android.permission.BLUETOOTH_SCAN" usesPermissionFlags="0x10000">
  </uses-permission>
  <uses-permission name="android.permission.USE_BIOMETRIC">
  </uses-permission>
  <uses-permission name="android.permission.USE_FINGERPRINT">
  </uses-permission>
  <uses-permission name="android.permission.WAKE_LOCK">
  </uses-permission>
  <uses-permission name="com.google.android.c2dm.permission.RECEIVE">
  </uses-permission>
  <uses-permission name="com.google.android.gms.permission.AD_ID">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_ADSERVICES_ATTRIBUTION">
  </uses-permission>
  <uses-permission name="android.permission.ACCESS_ADSERVICES_AD_ID">
  </uses-permission>
  <uses-permission name="android.permission.RECEIVE_BOOT_COMPLETED">
  </uses-permission>
  <permission name="com.ton_keeper.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION" protectionLevel="0x2">
  </permission>
  <uses-permission name="com.ton_keeper.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION">
  </uses-permission>
  <application theme="0x7f140297" label="0x7f13002d" icon="0x7f100004" name="com.tonapps.tonkeeper.App" manageSpaceActivity="com.tonapps.tonkeeper.ui.screen.root.RootActivity" allowBackup="0x0" hardwareAccelerated="0xffffffffffffffff" largeHeap="0xffffffffffffffff" supportsRtl="0x0" extractNativeLibs="0x0" fullBackupContent="0x0" networkSecurityConfig="0x7f160006" roundIcon="0x7f100005" appComponentFactory="androidx.core.app.CoreComponentFactory" dataExtractionRules="0x7f160001" enableOnBackInvokedCallback="0xffffffffffffffff">
    <activity theme="0x7f140297" name="com.tonapps.tonkeeper.ui.screen.root.RootActivity" exported="0xffffffffffffffff" launchMode="0x2" screenOrientation="0x1" configChanges="0x6b0" windowSoftInputMode="0x10" hardwareAccelerated="0xffffffffffffffff" largeHeap="0xffffffffffffffff">
      <intent-filter>
        <action name="android.intent.action.MAIN">
        </action>
      </intent-filter>
      <intent-filter priority="0x1">
        <action name="android.nfc.action.NDEF_DISCOVERED">
        </action>
        <action name="android.intent.action.VIEW">
        </action>
        <category name="android.intent.category.DEFAULT">
        </category>
        <category name="android.intent.category.BROWSABLE">
        </category>
        <data scheme="ton">
        </data>
        <data scheme="tonkeeper">
        </data>
        <data scheme="tc">
        </data>
        <data scheme="tonsite">
        </data>
      </intent-filter>
      <intent-filter priority="0x1" autoVerify="0xffffffffffffffff">
        <action name="android.nfc.action.NDEF_DISCOVERED">
        </action>
        <action name="android.intent.action.VIEW">
        </action>
        <category name="android.intent.category.LAUNCHER">
        </category>
        <category name="android.intent.category.DEFAULT">
        </category>
        <category name="android.intent.category.BROWSABLE">
        </category>
        <data scheme="https">
        </data>
        <data host="app.tonkeeper.com">
        </data>
      </intent-filter>
    </activity>
    <activity-alias icon="0x7f100004" name="com.tonapps.tonkeeper.DefaultLauncherIcon" enabled="0xffffffffffffffff" exported="0xffffffffffffffff" targetActivity="com.tonapps.tonkeeper.ui.screen.root.RootActivity" roundIcon="0x7f100005">
      <intent-filter>
        <action name="android.intent.action.MAIN">
        </action>
        <category name="android.intent.category.LAUNCHER">
        </category>
        <category name="android.intent.category.MULTIWINDOW_LAUNCHER">
        </category>
      </intent-filter>
    </activity-alias>
    <activity-alias icon="0x7f100000" name="com.tonapps.tonkeeper.AccentLauncherIcon" enabled="0x0" exported="0xffffffffffffffff" targetActivity="com.tonapps.tonkeeper.ui.screen.root.RootActivity" roundIcon="0x7f100001">
      <intent-filter>
        <action name="android.intent.action.MAIN">
        </action>
        <category name="android.intent.category.LAUNCHER">
        </category>
        <category name="android.intent.category.MULTIWINDOW_LAUNCHER">
        </category>
      </intent-filter>
    </activity-alias>
    <activity-alias icon="0x7f100002" name="com.tonapps.tonkeeper.DarkLauncherIcon" enabled="0x0" exported="0xffffffffffffffff" targetActivity="com.tonapps.tonkeeper.ui.screen.root.RootActivity" roundIcon="0x7f100003">
      <intent-filter>
        <action name="android.intent.action.MAIN">
        </action>
        <category name="android.intent.category.LAUNCHER">
        </category>
        <category name="android.intent.category.MULTIWINDOW_LAUNCHER">
        </category>
      </intent-filter>
    </activity-alias>
    <activity-alias icon="0x7f100008" name="com.tonapps.tonkeeper.LightLauncherIcon" enabled="0x0" exported="0xffffffffffffffff" targetActivity="com.tonapps.tonkeeper.ui.screen.root.RootActivity" roundIcon="0x7f100009">
      <intent-filter>
        <action name="android.intent.action.MAIN">
        </action>
        <category name="android.intent.category.LAUNCHER">
        </category>
        <category name="android.intent.category.MULTIWINDOW_LAUNCHER">
        </category>
      </intent-filter>
    </activity-alias>
    <activity theme="0x7f140245" name="com.tonapps.tonkeeper.core.signer.SignerHiddenActivity" enabled="0xffffffffffffffff" exported="0x0" configChanges="0x5a0" fitsSystemWindows="0xffffffffffffffff">
    </activity>
    <receiver label="0x7f1302ce" name="com.tonapps.tonkeeper.manager.widget.WidgetReceiver$Balance" exported="0xffffffffffffffff">
      <intent-filter>
        <action name="android.appwidget.action.APPWIDGET_UPDATE">
        </action>
      </intent-filter>
      <meta-data name="android.appwidget.provider" resource="0x7f160007">
      </meta-data>
    </receiver>
    <receiver label="0x7f13020a" name="com.tonapps.tonkeeper.manager.widget.WidgetReceiver$Rate" exported="0xffffffffffffffff">
      <intent-filter>
        <action name="android.appwidget.action.APPWIDGET_UPDATE">
        </action>
      </intent-filter>
      <meta-data name="android.appwidget.provider" resource="0x7f160008">
      </meta-data>
    </receiver>
    <service name="androidx.appcompat.app.AppLocalesMetadataHolderService" enabled="0x0" exported="0x0">
      <meta-data name="autoStoreLocales" value="0xffffffffffffffff">
      </meta-data>
    </service>
    <service name="com.tonapps.tonkeeper.manager.push.FirebasePush" exported="0x0">
      <intent-filter>
        <action name="com.google.firebase.MESSAGING_EVENT">
        </action>
      </intent-filter>
    </service>
    <meta-data name="com.google.firebase.messaging.default_notification_color" resource="0x7f0600a8">
    </meta-data>
    <meta-data name="com.google.firebase.messaging.default_notification_icon" resource="0x7f0801c0">
    </meta-data>
    <meta-data name="com.google.firebase.messaging.default_notification_channel_id" value="0x7f1300d9">
    </meta-data>
    <provider name="androidx.startup.InitializationProvider" exported="0x0" authorities="com.ton_keeper.androidx-startup">
      <meta-data name="androidx.emoji2.text.EmojiCompatInitializer" value="androidx.startup">
      </meta-data>
      <meta-data name="androidx.lifecycle.ProcessLifecycleInitializer" value="androidx.startup">
      </meta-data>
      <meta-data name="androidx.profileinstaller.ProfileInstallerInitializer" value="androidx.startup">
      </meta-data>
    </provider>
    <service name="com.google.android.gms.metadata.ModuleDependencies" enabled="0x0" exported="0x0">
      <intent-filter>
        <action name="com.google.android.gms.metadata.MODULE_DEPENDENCIES">
        </action>
      </intent-filter>
      <meta-data name="photopicker_activity:0:required" value="">
      </meta-data>
    </service>
    <service name="androidx.work.impl.foreground.SystemForegroundService" enabled="0x7f050003" exported="0x0" directBootAware="0x0" foregroundServiceType="0x1">
      <intent-filter>
        <action name="android.intent.action.ACTION_START_FOREGROUND">
        </action>
      </intent-filter>
    </service>
    <provider name="androidx.core.content.FileProvider" exported="0x0" authorities="com.ton_keeper.provider" grantUriPermissions="0xffffffffffffffff">
      <meta-data name="android.support.FILE_PROVIDER_PATHS" resource="0x7f160002">
      </meta-data>
    </provider>
    <receiver name="com.tonapps.tonkeeper.manager.widget.WidgetManager$PinnedReceiver" exported="0x0">
    </receiver>
    <meta-data name="preloaded_fonts" resource="0x7f03000a">
    </meta-data>
    <service name="androidx.camera.core.impl.MetadataHolderService" enabled="0x0" exported="0x0">
      <meta-data name="androidx.camera.core.impl.MetadataHolderService.DEFAULT_CONFIG_PROVIDER" value="androidx.camera.camera2.Camera2Config$DefaultProvider">
      </meta-data>
    </service>
    <service name="com.google.firebase.components.ComponentDiscoveryService" exported="0x0" directBootAware="0xffffffffffffffff">
      <meta-data name="com.google.firebase.components:com.google.firebase.perf.FirebasePerfKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.perf.FirebasePerfRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.messaging.ktx.FirebaseMessagingLegacyRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.messaging.FirebaseMessagingKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.messaging.FirebaseMessagingRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.analytics.ktx.FirebaseAnalyticsLegacyRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.remoteconfig.ktx.FirebaseConfigLegacyRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.remoteconfig.FirebaseRemoteConfigKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.remoteconfig.RemoteConfigRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.crashlytics.ktx.FirebaseCrashlyticsKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.crashlytics.FirebaseCrashlyticsKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.crashlytics.CrashlyticsRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.sessions.FirebaseSessionsRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.analytics.connector.internal.AnalyticsConnectorRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.installations.FirebaseInstallationsKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.installations.FirebaseInstallationsRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.ktx.FirebaseCommonLegacyRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.FirebaseCommonKtxRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.abt.component.AbtRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.firebase.datatransport.TransportRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
    </service>
    <service name="com.google.mlkit.common.internal.MlKitComponentDiscoveryService" exported="0x0" directBootAware="0xffffffffffffffff">
      <meta-data name="com.google.firebase.components:com.google.mlkit.vision.barcode.internal.BarcodeRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.mlkit.vision.common.internal.VisionCommonRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
      <meta-data name="com.google.firebase.components:com.google.mlkit.common.internal.CommonComponentRegistrar" value="com.google.firebase.components.ComponentRegistrar">
      </meta-data>
    </service>
    <provider name="com.google.mlkit.common.internal.MlKitInitProvider" exported="0x0" authorities="com.ton_keeper.mlkitinitprovider" initOrder="0x63">
    </provider>
    <activity theme="0x1030055" name="androidx.core.google.shortcuts.TrampolineActivity" exported="0xffffffffffffffff" noHistory="0xffffffffffffffff">
      <intent-filter>
        <action name="androidx.core.content.pm.SHORTCUT_LISTENER">
        </action>
      </intent-filter>
      <meta-data name="androidx.core.content.pm.shortcut_listener_impl" value="androidx.core.google.shortcuts.ShortcutInfoChangeListenerImpl">
      </meta-data>
    </activity>
    <meta-data name="com.google.android.play.billingclient.version" value="7.1.1">
    </meta-data>
    <activity theme="0x1030010" name="com.android.billingclient.api.ProxyBillingActivity" exported="0x0" configChanges="0x5b0">
    </activity>
    <activity theme="0x1030010" name="com.android.billingclient.api.ProxyBillingActivityV2" exported="0x0" configChanges="0x5b0">
    </activity>
    <receiver name="com.google.firebase.iid.FirebaseInstanceIdReceiver" permission="com.google.android.c2dm.permission.SEND" exported="0xffffffffffffffff">
      <intent-filter>
        <action name="com.google.android.c2dm.intent.RECEIVE">
        </action>
      </intent-filter>
      <meta-data name="com.google.android.gms.cloudmessaging.FINISHED_AFTER_HANDLED" value="0xffffffffffffffff">
      </meta-data>
    </receiver>
    <service name="com.google.firebase.messaging.FirebaseMessagingService" exported="0x0" directBootAware="0xffffffffffffffff">
      <intent-filter priority="0xfffffffffffffe0c">
        <action name="com.google.firebase.MESSAGING_EVENT">
        </action>
      </intent-filter>
    </service>
    <receiver name="com.google.android.gms.measurement.AppMeasurementReceiver" enabled="0xffffffffffffffff" exported="0x0">
    </receiver>
    <service name="com.google.android.gms.measurement.AppMeasurementService" enabled="0xffffffffffffffff" exported="0x0">
    </service>
    <service name="com.google.android.gms.measurement.AppMeasurementJobService" permission="android.permission.BIND_JOB_SERVICE" enabled="0xffffffffffffffff" exported="0x0">
    </service>
    <activity theme="0x1030010" name="com.google.android.gms.common.api.GoogleApiActivity" exported="0x0">
    </activity>
    <service name="com.google.firebase.sessions.SessionLifecycleService" enabled="0xffffffffffffffff" exported="0x0">
    </service>
    <property name="android.adservices.AD_SERVICES_CONFIG" resource="0x7f160003">
    </property>
    <provider name="com.google.firebase.provider.FirebaseInitProvider" exported="0x0" authorities="com.ton_keeper.firebaseinitprovider" initOrder="0x64" directBootAware="0xffffffffffffffff">
    </provider>
    <service name="com.ledger.live.ble.service.BleService" enabled="0xffffffffffffffff" exported="0xffffffffffffffff">
    </service>
    <service name="androidx.work.impl.background.systemalarm.SystemAlarmService" enabled="0x7f050002" exported="0x0" directBootAware="0x0">
    </service>
    <service name="androidx.work.impl.background.systemjob.SystemJobService" permission="android.permission.BIND_JOB_SERVICE" enabled="0x7f050004" exported="0xffffffffffffffff" directBootAware="0x0">
    </service>
    <receiver name="androidx.work.impl.utils.ForceStopRunnable$BroadcastReceiver" enabled="0xffffffffffffffff" exported="0x0" directBootAware="0x0">
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.ConstraintProxy$BatteryChargingProxy" enabled="0x0" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="android.intent.action.ACTION_POWER_CONNECTED">
        </action>
        <action name="android.intent.action.ACTION_POWER_DISCONNECTED">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.ConstraintProxy$BatteryNotLowProxy" enabled="0x0" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="android.intent.action.BATTERY_OKAY">
        </action>
        <action name="android.intent.action.BATTERY_LOW">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.ConstraintProxy$StorageNotLowProxy" enabled="0x0" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="android.intent.action.DEVICE_STORAGE_LOW">
        </action>
        <action name="android.intent.action.DEVICE_STORAGE_OK">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.ConstraintProxy$NetworkStateProxy" enabled="0x0" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="android.net.conn.CONNECTIVITY_CHANGE">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.RescheduleReceiver" enabled="0x0" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="android.intent.action.BOOT_COMPLETED">
        </action>
        <action name="android.intent.action.TIME_SET">
        </action>
        <action name="android.intent.action.TIMEZONE_CHANGED">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.background.systemalarm.ConstraintProxyUpdateReceiver" enabled="0x7f050002" exported="0x0" directBootAware="0x0">
      <intent-filter>
        <action name="androidx.work.impl.background.systemalarm.UpdateProxies">
        </action>
      </intent-filter>
    </receiver>
    <receiver name="androidx.work.impl.diagnostics.DiagnosticsReceiver" permission="android.permission.DUMP" enabled="0xffffffffffffffff" exported="0xffffffffffffffff" directBootAware="0x0">
      <intent-filter>
        <action name="androidx.work.diagnostics.REQUEST_DIAGNOSTICS">
        </action>
      </intent-filter>
    </receiver>
    <service name="androidx.room.MultiInstanceInvalidationService" exported="0x0" directBootAware="0xffffffffffffffff">
    </service>
    <uses-library name="android.ext.adservices" required="0x0">
    </uses-library>
    <meta-data name="com.google.android.gms.version" value="0x7f0b0009">
    </meta-data>
    <service name="com.google.android.datatransport.runtime.backends.TransportBackendDiscovery" exported="0x0">
      <meta-data name="backend:com.google.android.datatransport.cct.CctBackendFactory" value="cct">
      </meta-data>
    </service>
    <receiver name="androidx.profileinstaller.ProfileInstallReceiver" permission="android.permission.DUMP" enabled="0xffffffffffffffff" exported="0xffffffffffffffff" directBootAware="0x0">
      <intent-filter>
        <action name="androidx.profileinstaller.action.INSTALL_PROFILE">
        </action>
      </intent-filter>
      <intent-filter>
        <action name="androidx.profileinstaller.action.SKIP_FILE">
        </action>
      </intent-filter>
      <intent-filter>
        <action name="androidx.profileinstaller.action.SAVE_PROFILE">
        </action>
      </intent-filter>
      <intent-filter>
        <action name="androidx.profileinstaller.action.BENCHMARK_OPERATION">
        </action>
      </intent-filter>
    </receiver>
    <service name="com.google.android.datatransport.runtime.scheduling.jobscheduling.JobInfoSchedulerService" permission="android.permission.BIND_JOB_SERVICE" exported="0x0">
    </service>
    <receiver name="com.google.android.datatransport.runtime.scheduling.jobscheduling.AlarmManagerSchedulerBroadcastReceiver" exported="0x0">
    </receiver>
    <activity theme="0x7f140293" name="com.google.android.play.core.common.PlayCoreDialogWrapperActivity" exported="0x0" stateNotNeeded="0xffffffffffffffff">
    </activity>
  </application>
</manifest>
`;

export const XmlString = () => ({
  name: "XML",
  components: { FieldValue },
  setup() {
    return {
      value: XML_STRING,
    };
  },
  template: `
    <FieldValue label="XML" type="xml" :value="value" />`,
});

export const JsonObject = () => ({
  name: "JsonObject",
  components: { FieldValue },
  setup() {
    return {
      text: {
        identifier: "132431",
        attributes: {
          id: 132431,
          age_ratings: [41588, 54620],
          artworks: [15284],
          category: 0,
          cover: {
            id: 192090,
            alpha_channel: false,
            animated: false,
            game: 132431,
            height: 800,
            image_id: "co447u",
            url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/co447u.jpg",
            width: 600,
            checksum: "d404a494-f176-7ce4-f593-62234722d501",
          },
          created_at: "2020-04-21T11:38:07.000000Z",
          external_games: [1860057, 1974518],
          first_release_date: "2021-02-23T00:00:00.000000Z",
          genres: [
            {
              id: 8,
              created_at: 1297555200,
              name: "Platform",
              slug: "platform",
              updated_at: 1323216000,
              url: "https:\\/\\/www.igdb.com\\/genres\\/platform",
              checksum: "697fc5a4-b96f-a803-288a-498bd5dd1de1",
            },
            {
              id: 9,
              created_at: 1297555200,
              name: "Puzzle",
              slug: "puzzle",
              updated_at: 1323216000,
              url: "https:\\/\\/www.igdb.com\\/genres\\/puzzle",
              checksum: "616de9c3-8a00-0232-9df9-00014cfac51b",
            },
            {
              id: 31,
              created_at: 1323561600,
              name: "Adventure",
              slug: "adventure",
              updated_at: 1323561600,
              url: "https:\\/\\/www.igdb.com\\/genres\\/adventure",
              checksum: "a6d85192-8d11-bad3-cc5c-dd89e2f94a47",
            },
            {
              id: 32,
              created_at: 1341360000,
              name: "Indie",
              slug: "indie",
              updated_at: 1341360000,
              url: "https:\\/\\/www.igdb.com\\/genres\\/indie",
              checksum: "2522259f-2454-ec02-5dc0-84373e0508ed",
            },
            {
              id: 33,
              created_at: 1380931200,
              name: "Arcade",
              slug: "arcade",
              updated_at: 1380931200,
              url: "https:\\/\\/www.igdb.com\\/genres\\/arcade",
              checksum: "388cec36-d099-f4a1-31c3-f938fae9067b",
            },
          ],
          involved_companies: [123411, 130040],
          name: "iota.",
          platforms: [39, 130],
          release_dates: [251258, 341036],
          screenshots: [
            {
              id: 440748,
              alpha_channel: false,
              animated: false,
              game: 132431,
              height: 720,
              image_id: "sc9g30",
              url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g30.jpg",
              width: 1280,
              checksum: "19c4ff22-ddf2-3195-022c-a7237ac3cd63",
            },
            {
              id: 440749,
              alpha_channel: false,
              animated: false,
              game: 132431,
              height: 720,
              image_id: "sc9g31",
              url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g31.jpg",
              width: 1280,
              checksum: "aa761763-5bea-d242-07bd-cb744a6c5b25",
            },
            {
              id: 440750,
              alpha_channel: false,
              animated: false,
              game: 132431,
              height: 720,
              image_id: "sc9g32",
              url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g32.jpg",
              width: 1280,
              checksum: "d973d0dc-3f20-3586-5e39-31cab3233d89",
            },
            {
              id: 440751,
              alpha_channel: false,
              animated: false,
              game: 132431,
              height: 720,
              image_id: "sc9g33",
              url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g33.jpg",
              width: 1280,
              checksum: "996ec510-ab5d-992c-1d60-ca251eef4011",
            },
            {
              id: 440752,
              alpha_channel: false,
              animated: false,
              game: 132431,
              height: 720,
              image_id: "sc9g34",
              url: "\\/\\/images.igdb.com\\/igdb\\/image\\/upload\\/t_thumb\\/sc9g34.jpg",
              width: 1280,
              checksum: "19235dbf-76d5-5a23-8b7c-3a9501456056",
            },
          ],
          similar_games: [
            20342, 25646, 28070, 55190, 81680, 89597, 106992, 110503, 111130,
            117311,
          ],
          slug: "iota",
          summary:
            "iota is the first hardcore platformer designed with the touch screen in mind! There is no jump button. You will bounce from the floor to the ceiling as you make your way left, right, up, and down as you dodge saws and avoid spikes to make it to the next level.\\n\\niota features 36 handcrafted levels which provide over 5 hours of content!\\n\\niota is for people who are bored with casual games and are ready for a real challenge! Experience console level difficulty on your iPhone and iPad!",
          tags: [1, 268435464, 268435465, 268435487, 268435488, 268435489],
          themes: [
            {
              id: 1,
              created_at: 1322524800,
              name: "Action",
              slug: "action",
              updated_at: 1323216000,
              url: "https:\\/\\/www.igdb.com\\/themes\\/action",
              checksum: "c177e0ff-f29a-2a2e-fce5-f945258ceb59",
            },
          ],
          updated_at: "2022-02-03T00:18:55.000000Z",
          url: "https:\\/\\/www.igdb.com\\/games\\/iota",
          websites: [
            {
              id: 175967,
              category: 10,
              game: 132431,
              trusted: true,
              url: "https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707",
              checksum: "65cb0a14-80af-da36-3322-766ae9fd70e8",
            },
            {
              id: 175968,
              category: 11,
              game: 132431,
              trusted: true,
              url: "https:\\/\\/apps.apple.com\\/us\\/app\\/iota\\/id1439978707",
              checksum: "0721050e-2777-c748-fad6-b4bc77769b66",
            },
            {
              id: 189644,
              category: 13,
              game: 132431,
              trusted: true,
              url: "https:\\/\\/store.steampowered.com\\/app\\/1273430",
              checksum: "ffdcbcd3-45d6-8609-6530-445ccbc03494",
            },
          ],
          checksum: "3be7df3f-80c4-7847-9234-9fc72e47ba88",
        },
        relations: [],
      },
    };
  },
  template: `
    <FieldValue label="JSON" type="json" :value="text" />`,
});

export const JsonNull = () => ({
  name: "JsonNull",
  components: { FieldValue },
  template: `
    <FieldValue label="JSON" type="json" :value="null" />`,
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
    <FieldValue label="Label" type="video" :videoId="videoId" />`,
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
    <FieldValue label="Label" type="video" :src="src" />`,
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
    <FieldValue label="Label" type="image" :src="src" />`,
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
    <FieldValue label="Label" type="gallery" :images="images" />`,
});

export const List = () => ({
  name: "ListFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Список продуктов на неделю" :with-edit="true" type="list" :value="[
      'Картофель', 'Морковь', 'Лук',  'Чеснок', 'Петрушка', 'Укроп'
    ]" />`,
});

export const Custom = () => ({
  name: "CustomFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Список продуктов на неделю" :loading="true" :with-edit="true" type="list"
                :edit-open-new-tab="true"
                edit-link="/">
      <template #value>
        Value <a href="#">Link</a>, Text
      </template>
    </FieldValue>`,
});

export const WithButtons = () => ({
  name: "CustomFieldValue",
  components: { FieldValue },
  template: `
    <FieldValue label="Список продуктов на неделю" type="list" :buttons="[
        {label: 'Button 1 (onClick)', variant: 'primary-link', onClick: () => alert('')},
        {label: 'Button 2 (Link)', variant: 'secondary-link', to: '/', useRouter: true, disabled: true},
        {label: 'Button 3 (New Tab)', variant: 'red-link', to: 'https://google.com', useRouter: false},
        {label: 'Button 4 (New Tab)', variant: 'green-link', to: 'https://google.com', useRouter: false},
        {label: 'Button 1 (onClick)', variant: 'primary', onClick: () => alert(''), loading: true},
        {label: 'Button 2 (Link)', variant: 'secondary', to: '/', useRouter: true},
        {label: 'Button 3 (New Tab)', variant: 'red', to: 'https://google.com', useRouter: false},
        {label: 'Button 4 (New Tab)', variant: 'green', to: 'https://google.com', useRouter: false},
    ]">
      <template #value>
        Value <a href="#">Link</a>, Text
      </template>
    </FieldValue>`,
});
