export default defineEventHandler(async (event) => {
  console.log('Fetching Instagram access token...');
  const instaAccessToken = await useStorage().getItem('token:insta')
  return instaAccessToken
})
