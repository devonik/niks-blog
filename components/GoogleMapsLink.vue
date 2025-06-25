<script lang="ts" setup>
import type { STRIPE_PAYMENT_LINKS_KEYS } from '~/utils/constants'

const links = import.meta.env.DEV ? DEV_STRIPE_PAYMENT_LINKS : PROD_STRIPE_PAYMENT_LINKS
defineProps<{
  stripePaymentLinkKey: STRIPE_PAYMENT_LINKS_KEYS
}>()
</script>

<template>
  <div class="justify-self-center">
    <a :href="links[stripePaymentLinkKey]" target="_blank">
      <img
        class="not-prose rounded-lg shadow-md"
        :src="`/blogs-img/google-maps/${stripePaymentLinkKey}.png`"
        width="350"
        alt="Google maps list"
      /> </a
    ><span class="text-xs text-gray-600">Click on the image to see the list in google maps</span>
  </div>
</template>

<style scoped></style>
