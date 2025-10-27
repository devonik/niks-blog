<script lang="ts" setup>
import { navbarData, homePage } from '~/data'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: homePage.description,
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: navbarData.homeTitle,
  description: navbarData.homeTitle,
  link: '/indonesia-komodo-me.jpg',
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </main>
</template>
