<script setup lang="ts">
const { path } = useRoute()
const articles = await queryCollection('content').path(path).first()

const links = articles?.body?.toc?.links || []
</script>

<template>
  <div class="lg:col-span-3 sticky top-28 h-96 hidden lg:block justify-self-end">
    <div class="border dark:border-gray-800 p-3 rounded-md min-w-[200px] dark:bg-slate-900">
      <h1 class="text-sm font-bold mb-3 border-b dark:border-gray-800 pb-2">Table Of Content</h1>
      <div v-for="link in links" :key="link.id">
        <NuxtLink :to="`#${link.id}`" class="block mb-3 hover:underline">
          {{ link.text }}
        </NuxtLink>
        <NuxtLink
          v-for="children in link.children"
          :key="children.id"
          :to="`#${children.id}`"
          class="block text-xs mb-3 hover:underline"
        >
          {{ children.text }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
