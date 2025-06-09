<script lang="ts" setup>
import type { Comment } from '~/types'

const props = defineProps<{
  blogId: string
}>()

const { data: comments, refresh } = useFetch<Comment[]>(`/api/comments?blogId=${props.blogId}`)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="gap-3 border rounded-lg flex flex-col p-4 elevation-2 dark:bg-gray-800 bg-white"
    >
      <BlogComment :blog-id="blogId" :comment="comment" />
    </div>
    <div v-if="!comments?.length" class="text-gray-500 dark:text-gray-400">No comments yet.</div>
    <BlogComment :blog-id="blogId" @new-comment="refresh()" />
  </div>
</template>

<style scoped></style>
