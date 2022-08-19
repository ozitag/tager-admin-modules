<template>
  <div :class="{ blur: isEditing }">
    <div :id="mapId" class="map" />
  </div>
</template>

<script lang="ts">
import * as L from "leaflet";
import type { LeafletMouseEventHandlerFn, Map, Marker } from "leaflet";
import { defineComponent, onMounted, type PropType, watch } from "vue";

import { createId } from "@tager/admin-services";

import { type MapValueType, ValuePropSchema } from "../MapField.helpers";

type Props = {
  value: MapValueType;
  isEditing: boolean;
};

export default defineComponent({
  name: "BaseMap",
  props: {
    value: {
      type: Object as PropType<MapValueType>,
      required: true,
      validator(value: unknown): boolean {
        return ValuePropSchema.safeParse(value).success;
      },
    },
    isEditing: Boolean,
  },
  emits: ["update:value"],
  setup(props: Props, context) {
    const mapId = createId();

    let mapRef: Map;
    let markerRef: Marker;

    watch(
      () => props.value,
      () => {
        if (markerRef) {
          markerRef.setLatLng(props.value);
        }

        if (mapRef) {
          mapRef.setView(props.value, mapRef.getZoom());
        }
      }
    );

    onMounted(() => {
      mapRef = L.map(mapId).setView(props.value, 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef);

      const googleMapMarkerIcon = L.icon({
        iconUrl:
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
        iconSize: [27, 43],
        iconAnchor: [13, 43],
      });

      markerRef = L.marker(props.value, {
        icon: googleMapMarkerIcon,
      });

      markerRef.addTo(mapRef);

      const clickHandler: LeafletMouseEventHandlerFn = (event) => {
        context.emit("update:value", event.latlng);
      };

      mapRef.on("click", clickHandler);

      // TODO: we need to invalidate size when use the form in repeater block and user opens it
      setInterval(() => {
        mapRef.invalidateSize();
      }, 500);
    });

    return { mapId };
  },
});
</script>

<style scoped lang="scss">
.map {
  position: relative;
  height: 380px;
  margin-bottom: 1rem;
}

.blur {
  filter: blur(2px);
  pointer-events: none;
}
</style>
