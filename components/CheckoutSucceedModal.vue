<script setup lang="ts">
defineProps<{
  isModalVisible: boolean
}>()
const emit = defineEmits(['close'])
</script>
<template>
  <transition name="fade">
    <div v-if="isModalVisible" class="h-full w-full fixed top-0 left-0 flex">
      <div class="absolute inset-0 z-0 opacity-70 bg-black" @click="$emit('close')"></div>
      <div
        class="w-full max-w-xs max-h-xs p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <slot>Popup default slot</slot>
        <div class="p-3 mt-2 text-center space-x-4 md:block">
          <slot name="actions">
            <button
              class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
              @click="$emit('close')"
            >
              Close
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
