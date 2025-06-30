<script lang="ts" setup>
withDefaults(
  defineProps<{
    slotId: string
    format: string
    layout: string
  }>(),
  {
    format: 'auto',
    layout: 'auto',
  },
)
</script>

<template>
  <ScriptGoogleAdsense
    :data-ad-client="$config.public.scripts.googleAdsense.client"
    :data-ad-slot="slotId"
    :data-ad-format="format"
    :data-ad-layout="layout"
  >
    <template #error>
      <!-- Fallback content -->
      <p>Please support me by disabling your ad blocker.</p>
    </template>
  </ScriptGoogleAdsense>
</template>

<style scoped></style>
