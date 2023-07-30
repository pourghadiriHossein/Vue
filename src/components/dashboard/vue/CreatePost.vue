<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import MapView from 'src/components/map/mapView.vue';
import { Post } from 'src/models/post';

const props = defineProps({
  modelValue: {
    default: false,
  },
  img: {
    default: <any>null
  },
  title: {
    default: ''
  },
  description: {
    default: ''
  },
  refresh: {}
});

const model = ref(null);

const createPostParameter = ref({
  title: '',
  description: '',
  image: undefined,
  latitude: <number>37.28,
  longitude: <number>49.6,
});

const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: ''
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
}

const emit = defineEmits(['update:model-value']);

const close = () => {
  emit.call(this, 'update:model-value', false);
};

const accepted = () => {
  Post.createPost(
    createPostParameter.value.title,
    createPostParameter.value.description,
    createPostParameter.value.image,
    createPostParameter.value.latitude,
    createPostParameter.value.longitude,
  )
    .then(
      (response) => {
        if (response.status == 200) {
          if (response.data.errors) {
            errorMessage.value.error = response.data.errors;
            errorMessage.value.state = successErrorState;
            hidden.value = false;
            props.refresh();
            setTimeout(() => {
              emit.call(this, 'update:model-value', false);
            }, 2000);
          }
        }
      },
      (reject) => {
        if (reject.response.status != 200) {
          if (reject.response.data.errors) {
            errorMessage.value.error = reject.response.data.errors;
            errorMessage.value.state = dangerErrorState;
            hidden.value = false;
          }
        }
      }
    )
};
</script>

<template>
  <q-dialog :model-value="modelValue" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Post</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-list :class="errorMessage.state" :hidden="hidden">
          <q-item>
            <q-btn
              size="sm"
              color="transparent"
              dense
              icon="close"
              @click="closeErrorPart()"
            ></q-btn>
          </q-item>
          <q-separator inset dark />
          <q-item v-for="item in errorMessage.error" :key="item">
            <q-item-section>
              {{ item[0] }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model:model-value="createPostParameter.title" label="Enter Your Title" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input type="textarea" dense v-model:model-value="createPostParameter.description"
          label="Enter Your Description" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model:model-value="createPostParameter.image" label="Post Image" counter>
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="createPostParameter.image = null" class="cursor-pointer" />
          </template>
          <template v-slot:hint>
            File Size
          </template>
        </q-file>
      </q-card-section>
      <map-view v-model:latitude="createPostParameter.latitude" v-model:longitude="createPostParameter.longitude"
        :state="'update'"></map-view>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close" />
        <q-btn color="light-blue-8" icon-right="create" label="Create" @click="accepted" />
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
