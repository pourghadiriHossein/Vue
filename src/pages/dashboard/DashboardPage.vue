<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card class="my-card" v-for="post in posts" :key="post">
      <q-img :src="post.img" />
      <q-card-section>
        <q-btn
          fab
          color="light-blue-8"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ post.title }}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ post.username }}
        </div>
        <div class="text-caption text-grey">
          {{ post.description }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn color="light-blue-8" icon-right="favorite" :label="`Like (${post.upVoteCount})`" />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script lang="ts" setup>
import {posts} from 'src/components/dashboard/ts/dashboardComponent'
</script>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
