<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { Analytics } from '@vercel/analytics/nuxt'
import type { BeforeSendEvent } from '@vercel/analytics'

const isModalOpen = ref(false)
const checkoutSendEmailAgainErrorMessage = ref('')
const params = useUrlSearchParams('history')

watch(
  params,
  (newParams) => {
    if (newParams['checkout-succeed-session']) {
      isModalOpen.value = true
    }
  },
  { immediate: true },
)
function sendCheckoutSucceedEmail() {
  useFetch('/api/checkout-fulfill', {
    method: 'POST',
    body: JSON.stringify({
      sessionId: params['checkout-succeed-session'],
    }),
  })
    .then(() => {
      isModalOpen.value = false
    })
    .catch(() => {
      checkoutSendEmailAgainErrorMessage.value =
        'Could not send email, please try again or contact me via mail niklas.grieger@devnik.dev or on IG @nik.diver'
    })
}

const beforeSendAnalytics = (event: BeforeSendEvent) => {
  // Disable analytics for handling my own traffic
  if (event.url.includes('disable-analytics=1')) {
    return null
  }
  return event
}
</script>
<template>
  <div class="gd-container font-spacegrotesk">
    <header class="fixed w-full bg-[#F1F2F4] dark:bg-slate-950 z-10">
      <MainHeader />
    </header>
    <main>
      <div class="p-9" />
      <!--TODO ads not ready yet wait for review https://adsense.google.com/adsense/u/0/pub-4609998981070446/sites/list-->
      <Adsbygoogle ad-format="horizontal" />
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
    <Analytics :before-send="beforeSendAnalytics" />
    <SpeedInsights bef />
    <Modal :is-modal-visible="isModalOpen" @close="isModalOpen = false">
      <div class="justify-self-center">
        <Icon name="mdi:check-circle-outline" size="120" class="text-green-600" />
      </div>
      <p class="mt-3">
        Thank you for your purchase and your support! You got a email with the product(s). If you
        cannot find it check your spam folder or send the email again.
      </p>
      <p v-if="checkoutSendEmailAgainErrorMessage" class="text-red-500">
        {{ checkoutSendEmailAgainErrorMessage }}
      </p>

      <template #actions>
        <button
          class="mb-2 md:mb-0 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
          @click="sendCheckoutSucceedEmail"
        >
          <Icon name="mdi:email-send" size="30" class="text-sky-700 dark:text-sky-400" />
          Send again
        </button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
.google-ad-container {
  max-height: 100px;
}
</style>
