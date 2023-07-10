# Develop Client Side, Use maplibre package

## Install maplibre package Command
```bash
npm install maplibre-gl
```
## <a href="https://cloud.maptiler.com/">Create new account in maptiler web site</a>

## Create map Folder in components, then Create mapView.vue File
```bash
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
```
## In components/dashboard/ts Folder
- ### Update dashboardComponent.ts File, add latitude and longitude to posts
```bash
latitude: 37.27,
longitude: 49.53,
```
- ### Update myPostsComponent.ts File, add latitude and longitude to rows
```bash
latitude: 37.27,
longitude: 49.53,
```
- ### Update allPostsComponent.ts File, add latitude and longitude to rows
```bash
latitude: 37.27,
longitude: 49.53,
```
## In components/dashboard/vue Folder, Update AdminDeletePost.vue File
- ### import map to component
```bash
import MapView from 'src/components/map/mapView.vue';
```
- ### add latitude and longitude to props
```bash
latitude: {
      default: 37.28
},
longitude: {
  default: 49.6
},
```
- ### write tab mechanism in script
```bash
const tab = ref('image');
const changeTab = () => {
  if(tab.value == 'image')
    tab.value = 'map';
  else
    tab.value = 'image';
}
```
- ### write tab mechanism and use map component in template
```bash
<q-tab-panels v-model="tab" animated class="full-width">
  <q-tab-panel name="image">
    <q-img :src="img" :fit="'cover'"/>
  </q-tab-panel>

  <q-tab-panel name="map">
    <map-view
    :latitude="latitude"
    :longitude="longitude"
    :state="'delete'"
    ></map-view>
  </q-tab-panel>
</q-tab-panels>
<q-card-section>
  <q-btn
    fab
    color="primary"
    icon="place"
    class="absolute"
    style="top: 0; right: 12px; transform: translateY(-50%);"
    @click="changeTab()"
  />
  <div class="row no-wrap items-center">
    <div class="col text-h6 ellipsis">
      {{ title }}
    </div>
  </div>
</q-card-section>
```
## In components/dashboard/vue Folder, Update AdminUpdatePost.vue File
- ### import map to component
```bash
import MapView from 'src/components/map/mapView.vue';
```
- ### add latitude and longitude to props
```bash
latitude: {
      default: 37.28
},
longitude: {
  default: 49.6
},
```
- ### add latitude and longitude to updatePostParameter and watch in script
```bash
const updatePostParameter = ref({
  title: '',
  description: '',
  image: undefined,
  latitude: <number> 37.28,
  longitude: <number> 49.6,
})

watch(props, () => {
  updatePostParameter.value = {
    title: props.title,
    description: props.description,
    image: updatePostParameter.value.image,
    latitude: props.latitude,
    longitude: props.longitude,
  }
})
```
- ### add map component in template
```bash
<map-view
v-model:latitude="updatePostParameter.latitude"
v-model:longitude="updatePostParameter.longitude"
:state="'update'"
></map-view>
```
## In components/dashboard/vue Folder, Update CreatePost.vue File
- ### import map to component
```bash
import MapView from 'src/components/map/mapView.vue';
```
- ### add latitude and longitude to createPostParameter in script
```bash
const createPostParameter = ref({
  title: '',
  description: '',
  image: undefined,
  latitude: <number> 37.28,
  longitude: <number> 49.6,
})
```
- ### add map component in template
```bash
<map-view
v-model:latitude="createPostParameter.latitude"
v-model:longitude="createPostParameter.longitude"
:state="'update'"
></map-view>
```
## In components/dashboard/vue Folder, Update DeletePost.vue File
- ### import map to component
```bash
import MapView from 'src/components/map/mapView.vue';
```
- ### add latitude and longitude to props
```bash
latitude: {
      default: 37.28
},
longitude: {
  default: 49.6
},
```
- ### write tab mechanism in script
```bash
const tab = ref('image');
const changeTab = () => {
  if(tab.value == 'image')
    tab.value = 'map';
  else
    tab.value = 'image';
}
```
- ### write tab mechanism and use map component in template
```bash
<q-tab-panels v-model="tab" animated class="full-width">
  <q-tab-panel name="image">
    <q-img :src="img" :fit="'cover'"/>
  </q-tab-panel>

  <q-tab-panel name="map">
    <map-view
    :latitude="latitude"
    :longitude="longitude"
    :state="'delete'"
    ></map-view>
  </q-tab-panel>
</q-tab-panels>
<q-card-section>
  <q-btn
    fab
    color="primary"
    icon="place"
    class="absolute"
    style="top: 0; right: 12px; transform: translateY(-50%);"
    @click="changeTab()"
  />
  <div class="row no-wrap items-center">
    <div class="col text-h6 ellipsis">
      {{ title }}
    </div>
  </div>
</q-card-section>
```
## In components/dashboard/vue Folder, Update UpdatePost.vue File
- ### import map to component
```bash
import MapView from 'src/components/map/mapView.vue';
```
- ### add latitude and longitude to props
```bash
latitude: {
      default: 37.28
},
longitude: {
  default: 49.6
},
```
- ### add latitude and longitude to updatePostParameter and watch in script
```bash
const updatePostParameter = ref({
  title: '',
  description: '',
  image: undefined,
  latitude: <number> 37.28,
  longitude: <number> 49.6,
})

watch(props, () => {
  updatePostParameter.value = {
    title: props.title,
    description: props.description,
    image: updatePostParameter.value.image,
    latitude: props.latitude,
    longitude: props.longitude,
  }
})
```
- ### add map component in template
```bash
<map-view
v-model:latitude="updatePostParameter.latitude"
v-model:longitude="updatePostParameter.longitude"
:state="'update'"
></map-view>
```
## In pages/dashboard Folder, Update AllPostsPage.vue File
- ### Add latitude and longitude to updatePostParameter and deletePostParameter in script
```bash
latitude: <number> 0,
longitude: <number> 0,
```
- ### Add latitude and longitude to updatePostFunction and deletePostFunction in script
```bash
updatePostParameter.value.latitude = row.latitude;
updatePostParameter.value.longitude = row.longitude;
```
```bash
deletePostParameter.value.latitude = row.latitude;
deletePostParameter.value.longitude = row.longitude;
```
- ### Add latitude and longitude to AdminUpdatePost component and AdminDeletePost component in template
```bash
:latitude="updatePostParameter.latitude"
:longitude="updatePostParameter.longitude"
```
```bash
:latitude="deletePostParameter.latitude"
:longitude="deletePostParameter.longitude"
```


## In pages/dashboard Folder, Update DashboardPage.vue File
- ### import map component and vue in script
```bash
import MapView from 'src/components/map/mapView.vue';
import { ref } from 'vue';
```
- ### Add Primary Function For Full Size Map in script
```bash
const mapVariable = ref({
  lat : <number> 0,
  long : <number> 0,
  state : <string> 'view',
});
const fullMapView = ref(false);
const fullMap = (lat: number, long:number) => {
  mapVariable.value.lat = lat;
  mapVariable.value.long = long;
  fullMapView.value = true;
}
const maximizedToggle = ref(true);
```
- ### Update first q-card-section tag for card in template
```bash
<q-card-section>
  <q-btn
    fab
    color="light-blue-8"
    icon="place"
    class="absolute"
    style="top: 0; right: 12px; transform: translateY(-50%);"
    @click="fullMap(post.latitude, post.longitude)"
  />
  <div class="row no-wrap items-center">
    <div class="col text-h6 ellipsis">
      {{ post.title }}
    </div>
    <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
    </div>
  </div>
</q-card-section>
```
- ### add dialog box for full map view in template
```bash
<q-dialog
  v-model="fullMapView"
  persistent
  :maximized="maximizedToggle"
  transition-show="slide-up"
  transition-hide="slide-down"
>
  <q-card class="bg-primary text-white">
    <q-bar>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <map-view class="full-width full-height"
    :latitude="mapVariable.lat"
    :longitude="mapVariable.long"
    ></map-view>
  </q-card>
</q-dialog>
```

## In pages/dashboard Folder, Update MyPostsPage.vue File
- ### Add latitude and longitude to updatePostParameter and deletePostParameter in script
```bash
latitude: <number> 0,
longitude: <number> 0,
```
- ### Add latitude and longitude to updatePostFunction and deletePostFunction in script
```bash
updatePostParameter.value.latitude = row.latitude;
updatePostParameter.value.longitude = row.longitude;
```
```bash
deletePostParameter.value.latitude = row.latitude;
deletePostParameter.value.longitude = row.longitude;
```
- ### Add latitude and longitude to UpdatePost component and DeletePost component in template
```bash
:latitude="updatePostParameter.latitude"
:longitude="updatePostParameter.longitude"
```
```bash
:latitude="deletePostParameter.latitude"
:longitude="deletePostParameter.longitude"
```

