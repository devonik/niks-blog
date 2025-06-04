export default defineEventHandler(async () => {
  const instaAccessToken = await useStorage().getItem('token:insta')
  return instaAccessToken
})
