<script setup lang="ts">
import { blogsPage } from '~/data'
</script>

<template>
  <div class="container mx-auto mb-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1
          class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-5xl my-5"
        >
          {{ blogsPage.title }}
        </h1>
        <p class="dark:text-zinc-300">
          {{ blogsPage.description }}
        </p>
      </div>
      <div class="px-6 justify-self-center">
        <NuxtImg
          src="/galapagos-hammerhead-close.jpg"
          alt="Hero Image"
          width="400"
          height="400"
          class="archive-image-masked rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.archive-image-masked {
  align-items: center;
  width: 100%;
  background-repeat: none;
  -webkit-mask-image: url('/mask.png');
  mask-image: url('/mask.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: 191%;
  -webkit-mask-size: 191%;
  mask-position: -142px 22px;
  -webkit-mask-position: -142px 22px;
}
</style>
