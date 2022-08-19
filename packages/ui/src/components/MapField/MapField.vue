<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        :title="$i18n.t('ui:mapField.remove')"
        @click="handleRemoveValue"
      >
        <RemoveCircleIcon />
      </BaseButton>
      <BaseButton
        v-else
        variant="icon"
        :title="$i18n.t('ui:mapField.add')"
        @click="handleAddValue"
      >
        <AddCircleIcon />
      </BaseButton>
    </div>

    <template v-if="value">
      <Map
        :value="currentCoords"
        :is-editing="isFormEditing"
        @change="handleChange($event)"
      />
      <CoordinatesForm
        :value="currentCoords"
        :is-editing="isFormEditing"
        @editing:start="isFormEditing = true"
        @editing:finish="handleChange($event)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type PropType,
  ref,
  type SetupContext,
} from "vue";
import type { LatLngLiteral } from "leaflet";

import { BaseButton } from "../BaseButton";
import RemoveCircleIcon from "../../icons/RemoveCircleIcon.vue";
import AddCircleIcon from "../../icons/AddCircleIcon.vue";

import {
  type MapFieldValueType,
  MapFieldValueSchema,
} from "./MapField.helpers";
import CoordinatesForm from "./components/CoordinatesForm.vue";
import Map from "./components/Map.vue";

type NonNullableMapFieldValueType = NonNullable<MapFieldValueType>;

const INITIAL_VALUE: NonNullableMapFieldValueType = {
  latitude: 53.90523347876076,
  longitude: 27.44307786226273,
} as const;

type Props = {
  value: MapFieldValueType;
  label: string;
};

export default defineComponent({
  name: "MapField",
  components: {
    BaseButton,
    CoordinatesForm,
    Map,
    RemoveCircleIcon,
    AddCircleIcon,
  },
  props: {
    value: {
      type: Object as PropType<MapFieldValueType>,
      default: null,
      validator(value: unknown): boolean {
        return MapFieldValueSchema.safeParse(value).success;
      },
    },
    label: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props: Props, context: SetupContext) {
    const isFormEditing = ref<boolean>(false);

    const currentCoords = computed<LatLngLiteral>(() => ({
      lat: props.value?.latitude ?? INITIAL_VALUE.latitude,
      lng: props.value?.longitude ?? INITIAL_VALUE.longitude,
    }));

    function emitUpdateEvent(newValue: MapFieldValueType) {
      context.emit("update:value", newValue);
    }

    function handleChange(newCoordinates: LatLngLiteral) {
      const newValue: NonNullableMapFieldValueType = {
        latitude: newCoordinates.lat,
        longitude: newCoordinates.lng,
      };

      emitUpdateEvent(newValue);
      isFormEditing.value = false;
    }

    function handleRemoveValue() {
      isFormEditing.value = false;
      emitUpdateEvent(null);
    }

    function handleAddValue() {
      emitUpdateEvent({ ...INITIAL_VALUE });
    }

    return {
      handleRemoveValue,
      handleAddValue,
      handleChange,
      currentCoords,
      isFormEditing,
    };
  },
});
</script>

<style scoped lang="scss">
.button-field-container {
  margin-bottom: 1rem;
}

.title-row {
  display: inline-flex;
  align-items: center;
}

.field-title {
  font-size: 1.2rem;
}
</style>
