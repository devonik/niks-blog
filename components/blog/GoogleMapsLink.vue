<script lang="ts" setup>
defineProps<{
  text: string
  href: string
}>()
</script>

<template>
  <div class="flex gap-1 items-center mt-3">
    <Icon name="mdi:map-marker-radius-outline"></Icon>
    <a :href="href" target="_blank">{{ text }}</a>
    <Icon name="mdi:open-in-new"></Icon>
  </div>
</template>

<style scoped></style>
