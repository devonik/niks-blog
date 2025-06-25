<script setup lang="ts">
import type { BlogPost } from '~/types'
import { navbarData, seoData } from '~/data'

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryCollection('content').path(path).first(),
)

if (error.value) navigateTo('/404')
const stripePaymentLinks = import.meta.env.DEV
  ? DEV_STRIPE_PAYMENT_LINKS
  : PROD_STRIPE_PAYMENT_LINKS

const data = computed<BlogPost>(() => {
  const meta = articles?.value?.meta as unknown as BlogPost
  return {
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: meta?.image || '/not-found.jpg',
    alt: meta?.alt || 'no alter data available',
    ogImage: (articles?.value?.ogImage as unknown as string) || '/not-found.jpg',
    date: meta?.date || 'not-date-available',
    tags: meta?.tags || [],
    published: meta?.published || false,
  }
})

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    {
      name: 'description',
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: navbarData.homeTitle },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      property: 'og:title',
      content: data.value.title,
    },
    {
      property: 'og:description',
      content: data.value.description,
    },
    {
      property: 'og:image',
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      name: 'twitter:title',
      content: data.value.title,
    },
    {
      name: 'twitter:description',
      content: data.value.description,
    },
    {
      name: 'twitter:image',
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${seoData.mySite}/${path}`,
    },
  ],
})

// Generate OG Image
defineOgImageComponent('Test', {
  headline: 'Niks Blog 👋',
  title: articles.value?.seo.title || '',
  description: articles.value?.seo.description || '',
  link: data.value.ogImage,
})

const isModalOpen = ref(false)
setTimeout(() => {
  isModalOpen.value = true
}, 5000) // Close modal after 10 seconds
</script>

<template>
  <div class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="data.date"
        :description="data.description"
        :tags="data.tags"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
    <BlogToc />

    <div class="flex flex-row flex-wrap md:flex-nowrap mt-10 gap-2">
      <SocialShare
        v-for="network in ['facebook', 'linkedin', 'whatsapp']"
        :key="network"
        :network="network"
        :styled="true"
        :label="true"
        class="p-1"
        aria-label="Share with {network}"
      />
    </div>
    <Modal :is-modal-visible="isModalOpen" @close="isModalOpen = false">
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
        <a :href="stripePaymentLinks['google-maps-list--santa-cruz']" target="_blank">
          <button
            class="w-full mb-2 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Galapagos - Santa Cruz
          </button>
        </a>
        <a :href="stripePaymentLinks['google-maps-list--san-cristobal']" target="_blank">
          <button
            class="w-full mb-2 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Galapagos - San Cristobal
          </button>
        </a>
        <a :href="stripePaymentLinks['google-maps-list--isabela']" target="_blank">
          <button
            class="w-full mb-2 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Galapagos - Isabela
          </button>
        </a>
        <a :href="stripePaymentLinks['google-maps-list--tabletennis-worldwide']" target="_blank">
          <button
            class="w-full mb-2 border px-3 py-1 text-sm shadow-sm font-medium tracking-wider text-black rounded-md hover:shadow-lg hover:bg-gray-100"
          >
            Tabletennis Worldwide
          </button>
        </a>
      </template>
    </Modal>
  </div>
</template>
