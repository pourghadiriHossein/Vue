<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { Ref } from 'vue';
import maplibregl from 'maplibre-gl';

const props = defineProps({
  latitude: {
    default: <number> 37.28
  },
  longitude: {
    default: <number> 49.6
  },
  state: {
    default: <string> 'update'
  }
});
const latlong = ref({
  lat: <number> 37.28,
  long: <number> 49.6
});
const emit = defineEmits(['update:latitude', 'update:longitude']);

function createMapObject( mapRef: Ref, defaultCoordinated: maplibregl.LngLatLike = [props.longitude, props.latitude]) {
  const mapObject = new maplibregl.Map({
    container: mapRef.value,
    style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=0FJnvcFKNy5Bx3rGMA6R', // stylesheet location
    center: defaultCoordinated, // starting position [lng, lat]
    zoom:9, // starting zoom
  });
  mapObject.addControl(new maplibregl.NavigationControl({}));
  return mapObject;
}

function createMarker(coordinates: maplibregl.LngLatLike) {
  if(props.state == 'update'){
      const marker = new maplibregl.Marker({
      color: '#000000',
      draggable: true
    }).setLngLat(coordinates);
    return marker;
  }else{
      const marker = new maplibregl.Marker({
      color: '#000000',
      draggable: false
    }).setLngLat(coordinates);
    return marker;
  }
}

const mapRef = ref();
onMounted(() => {
  const map = createMapObject(mapRef);
  const marker = createMarker([ props.longitude, props.latitude ]);
  marker.addTo(map);
  const onDragEnd = () => {
    const lngLat = marker.getLngLat();
    latlong.value.lat = lngLat.lat;
    latlong.value.long = lngLat.lng;
    emit.call(this, 'update:latitude', latlong.value.lat);
    emit.call(this, 'update:longitude', latlong.value.long);
  };
  marker.on('dragend', onDragEnd);
});
</script>

<template>
  <div ref="mapRef" class="map"></div>
</template>

<style>
@import 'https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css';

.map {
  height: 200px;
}
</style>
