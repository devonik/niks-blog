import { useScheduler } from '#scheduler'

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
  if (process.env.APP_ENV === 'build') {
    console.log(
      '[server/plugins/refreshInstaToken.ts] Skipping starting scheduler, in build context',
    )
    return
  }
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
  const config = useRuntimeConfig()
  await $fetch<IGApiRefreshTokenResponse>(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${config.igAccessToken}`,
  ).then(async (result) => {
    config.igAccessToken = result.access_token
    console.log('[server/plugins/refreshInstaToken.ts] Instagram token refreshed successfully')
  })
}
