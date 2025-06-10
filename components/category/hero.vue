<script setup lang="ts">
import { categoryPage } from '~/data'
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1
          class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-5xl my-5"
        >
          {{ categoryPage.title }}
        </h1>
        <p class="dark:text-zinc-300">
          {{ categoryPage.description }}
        </p>
      </div>
      <div class="px-6 justify-self-center">
        <NuxtImg
          src="/indonesia-komodo-sunset.jpg"
          alt="Hero Image"
          width="400"
          height="400"
          class="category-image-masked rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.category-image-masked {
  align-items: center;
  width: 100%;
  background-repeat: none;
  -webkit-mask-image: url('/mask.png');
  mask-image: url('/mask.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: 115%;
  -webkit-mask-size: 115%;
  mask-position: center;
  -webkit-mask-position: center;
}
</style>
