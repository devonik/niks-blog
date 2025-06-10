<script lang="ts" setup>
import type { Comment } from '~/types'

const props = defineProps<{
  blogId: string
}>()

const { data: comments, execute } = useFetch<Comment[]>(`/api/comments?blogId=${props.blogId}`)
const newCommentsWaitingForVerify = ref<Comment[]>([])
onMounted(() => {
  execute()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(newComment, idx) in newCommentsWaitingForVerify"
      :key="idx"
      class="gap-3 border rounded-lg flex flex-col p-4 elevation-2 dark:bg-gray-800 bg-white"
    >
      <BlogComment :blog-id="blogId" :comment="newComment" />
    </div>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="gap-3 border rounded-lg flex flex-col p-4 elevation-2 dark:bg-gray-800 bg-white"
    >
      <BlogComment :blog-id="blogId" :comment="comment" />
    </div>
    <div v-if="!comments?.length" class="text-gray-500 dark:text-gray-400">No comments yet.</div>
    <BlogComment
      :blog-id="blogId"
      @new-comment="
        newCommentsWaitingForVerify.push({
          blog_id: blogId,
          author: $event.author,
          text: 'Waiting for verification',
        })
      "
    />
  </div>
</template>

<style scoped></style>
