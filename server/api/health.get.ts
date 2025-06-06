export default defineEventHandler(async () => {
  console.log('process.env.NUXT_IG_ACCESS_TOKEN', process.env.NUXT_IG_ACCESS_TOKEN)
  return process.env.NUXT_IG_ACCESS_TOKEN
})
