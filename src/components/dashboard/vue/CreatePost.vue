<script lang="ts" setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    img: {
      default: <any> null
    },
    title: {
      default: ''
    },
    description: {
      default: ''
    },
  });

  const model = ref(null);

  const createPostParameter = ref({
    title: '',
    description: '',
    image: undefined,
  })

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
        <div class="text-h6">Create New Post</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model:model-value="createPostParameter.title" label="Enter Your Title"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
          <q-input type="textarea" dense v-model:model-value="createPostParameter.description" label="Enter Your Description"/>
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
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="light-blue-8" icon-right="create" label="Create" @click="accepted"/>
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
