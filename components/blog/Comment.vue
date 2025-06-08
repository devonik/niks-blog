<script lang="ts" setup>
import type { Comment } from '~/types'
defineProps<{
  comment?: Comment
}>()
const emit = defineEmits<{
  newComment: [newComment: Comment]
}>()
function submitNewComment() {
  useFetch('/api/comments', {
    method: 'POST',
    body: newComment.value,
  }).then(() => {
    emit('newComment', newComment.value)
    newComment.value = { author: '', text: '' } // Reset the form
  })
}
const newComment = ref<Comment>({
  author: '',
  text: '',
})
</script>

<template>
  <div>
    <template v-if="comment">
      <h3 class="not-prose text-lg font-semibold">{{ comment.author }}</h3>
      <p class="not-prose text-gray-700 dark:text-gray-300">{{ comment.text }}</p>
      <p class="not-prose text-sm text-gray-500 dark:text-gray-400">
        {{ comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Just now' }}
      </p>
    </template>
    <template v-else>
      <input
        v-model="newComment.author"
        type="text"
        placeholder="Your name"
        class="not-prose border rounded p-2 w-full mb-2"
      />
      <textarea
        v-model="newComment.text"
        placeholder="Comment"
        class="not-prose border rounded p-2 w-full mb-2"
      ></textarea>
      <button
        class="not-prose bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
        @click="submitNewComment"
      >
        Submit Comment
      </button>
    </template>
  </div>
</template>

<style scoped></style>
