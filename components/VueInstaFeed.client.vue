<script lang="ts" setup>
import Instafeed from 'instafeed.js'

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
    filterTag: string
    orientation?: 'horizontal' | 'vertical'
    itemWidth?: number
    limit?: number
  }>(),
  {
    orientation: 'horizontal',
    itemWidth: 200,
    limit: 5,
  },
)
onMounted(async () => {
  const { data, execute } = await useFetch('/api/insta-token')

  setTimeout(() => {
    execute()
    console.log('token', data.value)

    const feed = new Instafeed({
      limit: props.limit,
      filter: (data: FilterPayload) => {
        if (props.filterTag && data.tags.includes(props.filterTag)) return true
        return false
      },
      render: (data: FilterPayload) => {
        console.log('data', data)
        if (data.model.media_type === 'VIDEO') {
          return `<a class="instafeed__item" style="max-width: ${props.itemWidth}px" href="${data.link}" target="_blank" rel="noopener noreferrer">
                <video controls>
                  <source src="${data.model.media_url}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </a>`
        }
        return `<a class="instafeed__item" style="max-width: ${props.itemWidth}px" href="${data.link}" target="_blank" rel="noopener noreferrer">
              <img src="${data.image}" alt="${data.caption}" />
            </a>`
      },
      accessToken: data.value,
    })

    feed.run()
  }, 5000)
})
</script>

<template>
  <div
    id="instafeed"
    :style="{ flexDirection: orientation === 'horizontal' ? 'row' : 'column' }"
  ></div>
</template>

<style lang="scss">
#instafeed {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  > .instafeed__item {
    flex: 1 0 33%;
  }
}
</style>
