import { useScheduler } from "#scheduler"

interface IGApiRefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  permissions: string
}

export default defineNitroPlugin(async () => {
    const token = await useStorage().getItem('instaAccessToken')
  if(!token) await refreshToken()
  startScheduler()
})

async function startScheduler() {
  const scheduler = useScheduler();

  
  scheduler.run(() => {
    refreshToken()
  }).everyMinutes(58);

  // create as many tasks as you want here
}
async function refreshToken(){
await $fetch<IGApiRefreshTokenResponse>('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGAAYgvJ4VSdNBZAE1KcUpVeVU3T3ZAHYVlKSGl5bzllRldrN2NlamlGS0F0bWN2ZAHBjZAEN2UUlDTXZAJd3BvbGd5RUludUd2RGplN1ZAFbkdLaV8ya0RjbVIwaHRGT0xGOTNQNU82ZAUUwTXpzSTlqZAnZAXSlY5WDlMYWw0ZAVJra3JkMAZDZD').then(async result => {
        
        await useStorage().setItem('instaAccessToken', result.access_token)
        console.log('Instagram access token refreshed:', result.access_token);
    })
}