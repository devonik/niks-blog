<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  isModalVisible: boolean
}>()
defineEmits(['close'])

watch(
  () => props.isModalVisible,
  (isVisible) => {
    document.documentElement.style.overflow = isVisible ? 'hidden' : ''
  },
)
</script>
<template>
  <transition name="fade">
    <div
      v-if="isModalVisible"
      class="h-screen w-screen fixed top-0 left-0 flex items-center justify-center z-50"
    >
      <div class="absolute inset-0 z-0 opacity-70 bg-black" @click="$emit('close')"></div>
      <div
        class="w-11/12 max-w-sm max-h-[80vh] p-4 md:p-6 relative rounded-xl shadow-lg bg-white overflow-y-auto z-10"
      >
        <div class="modal__toolbar-close" @click="$emit('close')">
          <Icon name="mdi:close-circle-outline" size="28" />
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
  top: -2px;
  right: -2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    top: -8px;
    right: -8px;
  }
}
</style>
