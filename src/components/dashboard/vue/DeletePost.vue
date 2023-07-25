<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  import MapView from 'src/components/map/mapView.vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    id: {
      default: 0
    },
    img: {
      default: 'No Image'
    },
    title: {
      default: 'Title'
    },
    username: {
      default: 'name'
    },
    description: {
      default: 'No Description'
    },
    latitude: {
      default: 37.28
    },
    longitude: {
      default: 49.6
    },
  });

  const tab = ref('image');
  const changeTab = () => {
    if(tab.value == 'image')
      tab.value = 'map';
    else
      tab.value = 'image';

  }
  const emit = defineEmits(['update:model-value']);

  const close = () => {
    emit.call(this, 'update:model-value', false);
  };
  const accepted = () => {
    emit.call(this, 'update:model-value', false);
  };
</script>

<template>

  <q-dialog :model-value="modelValue" persistent>
    <q-card class="my-card" style="min-width: 350px;">
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
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ props.username }}
        </div>
        <div class="text-caption text-grey">
          {{ props.description }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="light-blue-8" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="red" icon-right="delete" label="Remove" @click="accepted"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirm-dialog {
  width: 95%;
  max-width: 400px;
}
</style>
