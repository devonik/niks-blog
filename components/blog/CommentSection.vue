<script lang="ts" setup>
import type { Comment } from '~/types'

const { data: comments, refresh } = useFetch<Comment[]>('/api/comments')
</script>

<template>
  <div>
    <h3>Comments</h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="gap-3 border rounded-lg flex flex-col p-4 elevation-2 dark:bg-gray-800 bg-white"
      >
        <BlogComment :comment="comment" />
      </div>
      <div v-if="!comments?.length" class="text-gray-500 dark:text-gray-400">No comments yet.</div>
      <BlogComment @new-comment="refresh()" />
    </div>
  </div>
</template>

<style scoped></style>
