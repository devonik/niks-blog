import { useScheduler } from '#scheduler'
import { useRuntimeConfig } from '#imports'

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  console.log('config', config)
  const token = await useStorage().getItem('token:insta')
  // If no token is found, set it to the initial access token from runtime config
  if (!token) await useStorage().setItem('token:insta', config.igAccessToken)
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
  const token = await useStorage().getItem('token:insta')

  await $fetch<IGApiRefreshTokenResponse>(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
  ).then(async (result) => {
    await useStorage().setItem('token:insta', result.access_token)
  })
}
