<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import MapView from 'src/components/map/mapView.vue';

const props = defineProps({
  modelValue: {
    default: false,
  },
  id: {
    default: 0,
  },
  title: {
    default: 'Update',
  },
  description: {
    default: 'No Description',
  },
  latitude: {
    default: 37.28,
  },
  longitude: {
    default: 49.6,
  },
});

const updatePostParameter = ref({
  title: '',
  description: '',
  image: undefined,
  latitude: <number>37.28,
  longitude: <number>49.6,
});

watch(props, () => {
  updatePostParameter.value = {
    title: props.title,
    description: props.description,
    image: updatePostParameter.value.image,
    latitude: props.latitude,
    longitude: props.longitude,
  };
});

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
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update Post {{ props.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model:model-value="updatePostParameter.title"
          label="Enter Your Title"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="textarea"
          dense
          v-model:model-value="updatePostParameter.description"
          label="Enter Your Description"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="updatePostParameter.image"
          label="Post Image"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="updatePostParameter.image = null"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:hint> File Size </template>
        </q-file>
      </q-card-section>
      <map-view
        v-model:latitude="updatePostParameter.latitude"
        v-model:longitude="updatePostParameter.longitude"
        :state="'update'"
      ></map-view>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close" />
        <q-btn
          color="light-blue-8"
          icon-right="update"
          label="Update"
          @click="accepted"
        />
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
