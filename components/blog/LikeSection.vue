<script lang="ts" setup>
const props = defineProps<{
  blogId: string
}>()
const { data: likes, refresh, execute } = useFetch<number>(`/api/like-blog?blogId=${props.blogId}`)

async function submitLike() {
  await $fetch(`/api/like-blog?blogId=${props.blogId}`, {
    method: 'PUT',
  })
  liked.value = true
  refresh()
}
onMounted(() => {
  execute()
})
const liked = ref(false)
</script>

<template>
  <div>
    Do you like this blog? If yes, please consider liking it. Your support helps me to continue
    writing and sharing valuable content.
    <div class="flex flex-col items-center mt-4 gap-3">
      <button
        v-if="!liked"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        @click="submitLike"
      >
        <Icon name="mdi:thumb-up"></Icon> Like
      </button>
      <div v-else>Thank you!</div>
      <span v-if="likes" class="text-xs text-gray-400"
        >{{ likes }} people have liked this blog</span
      >
    </div>
  </div>
</template>

<style scoped></style>
