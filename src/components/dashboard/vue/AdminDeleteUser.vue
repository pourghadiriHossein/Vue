<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { User } from 'src/models/user';

const props = defineProps({
  modelValue: {
    default: false,
  },
  id: {
    default: 0,
  },
  username: {
    default: 'No username',
  },
  email: {
    default: 'No E-Mail',
  },
  refresh: {},
});
const hidden = ref(true);
const dangerErrorState = 'bg-red q-pa-sm text-white';
const successErrorState = 'bg-green q-pa-sm text-white';
const errorMessage = ref({
  error: [],
  state: '',
});
const closeErrorPart = () => {
  hidden.value = !hidden.value;
};
const emit = defineEmits(['update:model-value']);

const close = () => {
  emit.call(this, 'update:model-value', false);
};
const accepted = () => {
  User.deleteUserByAdmin(props.id).then(
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
  );
};
</script>

<template>
  <q-dialog :model-value="modelValue" persistent>
    <q-card>
      <q-card-section>
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
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Are You Sure, Want You To Delete {{ username }}?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="light-blue-8"
          icon-right="close"
          label="Cancel"
          @click="close"
        />
        <q-btn
          color="red"
          icon-right="delete"
          label="Delete"
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
