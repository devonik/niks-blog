import { useScheduler } from '#scheduler'

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
  console.log('Starting Instagram token refresh plugin', useRuntimeConfig())
  const token = await useStorage().getItem('token:insta')
  // If no token is found, set it to the initial access token from runtime config
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
  // If no token is found, use the initial access token from environment variables
  if (!token) token = 1111

  await $fetch<IGApiRefreshTokenResponse>(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
  ).then(async (result) => {
    await useStorage().setItem('token:insta', result.access_token)
  })
}
