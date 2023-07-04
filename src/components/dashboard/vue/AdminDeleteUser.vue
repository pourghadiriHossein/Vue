<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    modelValue: {
      default: false,
    },
    id: {
      default: 0
    },
    username: {
      default: 'No username'
    },
    email: {
      default: 'No E-Mail'
    },
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
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white" />
        <span class="q-ml-sm">Are You Sure, Want You To Delete {{ username }}?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="light-blue-8" icon-right="close" label="Cancel" @click="close"/>
        <q-btn color="red" icon-right="delete" label="Delete" @click="accepted"/>
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
