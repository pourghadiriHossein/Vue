<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { User } from 'src/models/user';

const props = defineProps({
  modelValue: {
    default: false,
  },
  id: {
    default: 0,
  },
  username: {
    default: '',
  },
  email: {
    default: '',
  },
  password: {
    default: '',
  },
  role: {
    default: 'user',
  },
  options: {
    default: ['admin', 'user'],
  },
  refresh: {},
});
const choice = ref();

const updateUserParameter = ref({
  username: '',
  email: '',
  password: '',
  avatar: undefined,
});

watch(props, () => {
  updateUserParameter.value = {
    username: props.username,
    email: props.email,
    password: '',
    avatar: undefined,
  };
  choice.value = props.role;
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
  User.updateUserByAdmin(
    props.id,
    updateUserParameter.value.username,
    updateUserParameter.value.email,
    updateUserParameter.value.password,
    updateUserParameter.value.avatar,
    choice.value
  ).then(
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
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Update {{ username }}</div>
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
        <q-input
          dense
          @keyup.enter="modelValue"
          v-model:model-value="updateUserParameter.username"
          label="Enter Your User Name"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          @keyup.enter="modelValue"
          v-model:model-value="updateUserParameter.email"
          label="Enter Your E-Mail"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="password"
          dense
          @keyup.enter="modelValue"
          v-model:model-value="updateUserParameter.password"
          label="Enter Your Password"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-file
          filled
          bottom-slots
          v-model:model-value="updateUserParameter.avatar"
          label="Avatar"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="updateUserParameter.avatar = null"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:hint> File Size </template>
        </q-file>
      </q-card-section>
      <q-card-section>
        <q-select v-model="choice" :options="options" label="Role" />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="red" icon-right="close" label="Cancel" @click="close" />
        <q-btn
          color="light-blue-8"
          icon-right="create"
          label="Create"
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
