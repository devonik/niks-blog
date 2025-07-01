<script setup lang="ts">
defineProps<{
  isModalVisible: boolean
}>()
defineEmits(['close'])
</script>
<template>
  <transition name="fade">
    <div v-if="isModalVisible" class="h-full w-full fixed top-0 left-0 flex">
      <div class="absolute inset-0 z-0 opacity-70 bg-black" @click="$emit('close')"></div>
      <div
        class="w-full max-w-xs max-h-xs p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <div class="modal__toolbar-close" @click="$emit('close')">
          <Icon name="mdi:close-circle-outline" size="24" />
        </div>
        <slot>Popup default slot</slot>
        <div class="p-3 mt-2 text-center md:block">
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
<style lang="scss" scoped>
.modal__toolbar-close {
  position: absolute;
  top: 0px;
  right: 2px;
  cursor: pointer;
}
</style>
