<script lang="ts" setup>
import Instafeed from 'instafeed.js'
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef } from 'vue'

interface FilterPayload {
  caption: string
  tags: string[]
  id: string
  image: string
  link: string
  model: {
    caption: string
    id: string
    media_type: string
    media_url: string
    permalink: string
    thumbnail_url: string
    timestamp: string
    username: string
  }
  timestamp: string
  type: string
  username: string
}
const props = withDefaults(
  defineProps<{
    filterTags: string[]
    orientation?: 'horizontal' | 'vertical'
    itemWidth?: number
  }>(),
  {
    orientation: 'horizontal',
    itemWidth: 200,
  },
)

const isLoaded = ref(false)
const target = useTemplateRef<HTMLDivElement>('target')
const targetIsVisible = useElementVisibility(target)

watch(targetIsVisible, async (isVisible) => {
  if (isVisible && !isLoaded.value) {
    const { data } = await useFetch('/api/insta-token')

    const feed = new Instafeed({
      filter: (data: FilterPayload) => {
        if (
          props.filterTags.some((tag) => {
            return data.tags.includes(tag)
          })
        )
          return true
        return false
      },
      render: (data: FilterPayload) => {
        let contentEl
        if (data.model.media_type === 'VIDEO')
          contentEl = `<video class="not-prose" controls>
                        <source src="${data.model.media_url}" type="video/mp4">
                        Your browser does not support the video tag.
                       </video>`
        else contentEl = `<img src="${data.model.media_url}" alt="${data.caption}" />`
        return `<div class="instafeed__item" >
                  <a href="${data.link}" target="_blank" rel="noopener noreferrer">
                  <div class="instafeed__item__header">
                    <span>${data.caption.substring(0, 50)}...</span>
                  </div>
                  ${contentEl}
                  </a>
                </div>`
      },
      accessToken: data.value,
    })

    feed.run()
    isLoaded.value = true
  }
})
onMounted(async () => {})
</script>

<template>
  <div
    id="instafeed"
    ref="target"
    :style="{ flexDirection: orientation === 'horizontal' ? 'row' : 'column' }"
  ></div>
</template>

<style lang="scss">
#instafeed {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  .instafeed__item {
    flex: 1 0 33%;
    flex-basis: 30%;
    max-width: 300px;
    .instafeed__item__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      min-height: 100px;
    }
  }
}
</style>
