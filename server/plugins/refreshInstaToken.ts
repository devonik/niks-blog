import { useScheduler } from '#scheduler'

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
  const token = await useStorage().getItem('token:insta')
  if (!token) await refreshToken()
  startScheduler()
})

async function startScheduler() {
  const scheduler = useScheduler()

  scheduler
    .run(() => {
      refreshToken()
    })
    .everyMinutes(58)

  // create as many tasks as you want here
}
async function refreshToken() {
  let token = await useStorage().getItem('token:insta')
  if(!token) token = useRuntimeConfig().IGAccessToken
  
  await $fetch<IGApiRefreshTokenResponse>(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
  ).then(async (result) => {
    await useStorage().setItem('token:insta', result.access_token)
    console.log('Instagram access token refreshed:', result.access_token)
  })
}
