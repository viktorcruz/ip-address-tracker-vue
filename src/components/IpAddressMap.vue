<template>
  <LMap 
    ref="mapRef" 
    :use-global-leaflet="false" 
    :zoom="13" 
    :center="[coordinates?.lat ?? 0, coordinates?.lng ?? 0]"
    style="height: calc(92vh - 200px); width: 100%;" 
    v-if="true" 
    id="map"
    >
    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors" />
    <LMarker 
      v-if="customIcon && coordinates" 
      :lat-lng="[coordinates.lat, coordinates.lng]" 
      :icon="customIcon" 
    />
  </LMap>
</template>

  
  <script lang="ts">
import { defineComponent, PropType, watch, toRefs, onMounted, ref, createApp } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import * as L from 'leaflet';
import LocationIcon from "../lib/IconLocation.vue";

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export default defineComponent({
  name: 'IpAddressMap',
  components: { LMap, LTileLayer, LMarker },
  props: {
    coordinates: {
      type: Object as PropType<{ lat: number, lng: number } | null>,
      required: true,
    }
  },
  setup(props) {
    const { coordinates } = toRefs(props);
    const customIcon = ref<L.Icon<L.IconOptions>>();

    const mapRef = ref<L.Map | null>(null);

    watch(
      () => props.coordinates,
      (newCoordinates) => {
        if (mapRef.value && newCoordinates) {
          mapRef.value.setView([newCoordinates.lat, newCoordinates.lng], 13);
          mapRef.value.invalidateSize();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      const iconMarkup = document.createElement('div');
      const app = createApp(LocationIcon);
      app.mount(iconMarkup);

      customIcon.value = L.divIcon({
        html: iconMarkup.innerHTML,
        iconSize: [35, 35], 
        className: 'custom-marker',
      }) as unknown as L.Icon<L.IconOptions>;
    });

    return {
      coordinates, customIcon
    };
  },
});
  </script>

  <style lang="css">
#map {
    position: relative;
    width: 100%;
    z-index: 5;
  }
</style>