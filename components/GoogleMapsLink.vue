<script lang="ts" setup>
import type { STRIPE_PAYMENT_LINKS_KEYS } from '~/utils/constants'
import {
  STRIPE_PAYMENT_NAMES,
  DEV_STRIPE_PAYMENT_LINKS,
  PROD_STRIPE_PAYMENT_LINKS,
} from '~/utils/constants'

const links = import.meta.env.DEV ? DEV_STRIPE_PAYMENT_LINKS : PROD_STRIPE_PAYMENT_LINKS
defineProps<{
  stripePaymentLinkKey: STRIPE_PAYMENT_LINKS_KEYS
}>()

const isModalOpen = ref(false)
</script>

<template>
  <div class="justify-self-center" @click="isModalOpen = true">
    <img
      class="not-prose rounded-lg shadow-md"
      :src="`/blogs-img/google-maps/${stripePaymentLinkKey}.png`"
      width="350"
      alt="Google maps list"
    />
    <span class="text-xs text-gray-600">Click on the image to see the list in google maps</span>
  </div>
  <OverlayModal :is-modal-visible="isModalOpen" @close="isModalOpen = false">
    <div class="justify-self-center">
      <Icon name="mdi:sale-outline" size="120" class="text-blue-600" />
    </div>
    <p class="mt-3">
      Get now access to one of my google map's lists. With the promotion code below you get it for
      free.
      <span class="text-red-600">Caution: Only 20 codes available!</span>
    </p>
    <p class="mt-3 font-semibold text-lg">
      <span class="text-blue-600">PROMO CODE: </span>
      <span class="text-red-600">FRIENDS100</span>
    </p>

    <template #actions>
      <a :href="links[stripePaymentLinkKey]" target="_blank">
        <button
          class="w-full mb-2 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
        >
          {{ STRIPE_PAYMENT_NAMES[stripePaymentLinkKey] }}
        </button>
      </a>
    </template>
  </OverlayModal>
</template>

<style scoped></style>
